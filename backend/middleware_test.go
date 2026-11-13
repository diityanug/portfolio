package backend

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func setupTestApp(t *testing.T, cfg Config) (*App, http.Handler) {
	t.Helper()
	tempDir := t.TempDir()
	dbPath := filepath.Join(tempDir, "test.db")
	db, driver, err := OpenAndInitDB(DBConfig{LocalDBPath: dbPath})
	if err != nil {
		t.Fatalf("OpenAndInitDB failed: %v", err)
	}
	if driver != "sqlite" {
		t.Fatalf("expected sqlite driver in test, got %q", driver)
	}

	// Register db.Close AFTER t.TempDir so LIFO cleanup closes the SQLite handle before removing tempDir on Windows.
	t.Cleanup(func() {
		_ = db.Close()
	})

	app := NewApp(db, cfg)
	return app, app.Router()
}

func TestOpenAndInitDB_SchemaAndSeed(t *testing.T) {
	if _, _, err := OpenAndInitDB(DBConfig{}); err == nil {
		t.Fatal("expected error when both TursoURL and LocalDBPath are empty")
	}

	tempDir := t.TempDir()
	dbPath := filepath.Join(tempDir, "schema.db")

	db, driver, err := OpenAndInitDB(DBConfig{LocalDBPath: dbPath})
	if err != nil {
		t.Fatalf("first OpenAndInitDB failed: %v", err)
	}
	if driver != "sqlite" {
		t.Fatalf("driver = %q, want sqlite", driver)
	}

	for _, table := range []string{"links", "messages", "click_logs"} {
		var name string
		err := db.QueryRow("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?", table).Scan(&name)
		if err != nil {
			_ = db.Close()
			t.Fatalf("expected table %q to exist: %v", table, err)
		}
	}

	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM links").Scan(&count); err != nil {
		_ = db.Close()
		t.Fatalf("count links failed: %v", err)
	}
	if count != len(DefaultShortlinks) {
		_ = db.Close()
		t.Fatalf("seeded link count = %d, want %d", count, len(DefaultShortlinks))
	}

	// Mutate clicks and verify reopening skips re-seeding cleanly without error
	if _, err := db.Exec("UPDATE links SET clicks = 5 WHERE slug = 'cv'"); err != nil {
		_ = db.Close()
		t.Fatalf("update clicks failed: %v", err)
	}
	_ = db.Close()

	db2, _, err := OpenAndInitDB(DBConfig{LocalDBPath: dbPath})
	if err != nil {
		t.Fatalf("second OpenAndInitDB failed: %v", err)
	}
	defer func() { _ = db2.Close() }()

	var cvClicks int
	if err := db2.QueryRow("SELECT clicks FROM links WHERE slug = 'cv'").Scan(&cvClicks); err != nil {
		t.Fatalf("query clicks failed: %v", err)
	}
	if cvClicks != 5 {
		t.Errorf("existing cv clicks = %d, want 5 after reopen", cvClicks)
	}
}

func TestAdminEndpoints_AuthChecks(t *testing.T) {
	_, router := setupTestApp(t, Config{
		ContactRateLimitMax:    5,
		ContactRateLimitWindow: time.Minute,
	})

	protectedRoutes := []struct {
		method string
		path   string
		body   string
	}{
		{http.MethodGet, "/api/messages", ""},
		{http.MethodGet, "/api/stats", ""},
		{http.MethodGet, "/api/analytics", ""},
		{http.MethodPost, "/api/links", `{"slug":"blog","target_url":"https://example.com"}`},
	}

	// 1. Fails closed (503) when ADMIN_SECRET is missing
	t.Setenv("ADMIN_SECRET", "")
	_ = os.Unsetenv("ADMIN_SECRET")

	for _, tc := range protectedRoutes {
		req := httptest.NewRequest(tc.method, tc.path, strings.NewReader(tc.body))
		rec := httptest.NewRecorder()
		router.ServeHTTP(rec, req)

		if rec.Code != http.StatusServiceUnavailable {
			t.Errorf("%s %s without ADMIN_SECRET = %d, want 503", tc.method, tc.path, rec.Code)
		}
	}

	// 2. Rejects missing or wrong token with 401
	t.Setenv("ADMIN_SECRET", "super-secret-admin-key")
	for _, tc := range protectedRoutes {
		req := httptest.NewRequest(tc.method, tc.path, strings.NewReader(tc.body))
		req.Header.Set("Authorization", "Bearer wrong-token")
		rec := httptest.NewRecorder()
		router.ServeHTTP(rec, req)

		if rec.Code != http.StatusUnauthorized {
			t.Errorf("%s %s with wrong token = %d, want 401", tc.method, tc.path, rec.Code)
		}
	}

	// 3. OPTIONS preflight succeeds even without token
	reqOpt := httptest.NewRequest(http.MethodOptions, "/api/messages", nil)
	recOpt := httptest.NewRecorder()
	router.ServeHTTP(recOpt, reqOpt)
	if recOpt.Code != http.StatusOK {
		t.Errorf("OPTIONS /api/messages = %d, want 200", recOpt.Code)
	}

	// 4. Accepts Bearer token and X-Admin-Key
	reqMsg := httptest.NewRequest(http.MethodGet, "/api/messages", nil)
	reqMsg.Header.Set("Authorization", "Bearer super-secret-admin-key")
	recMsg := httptest.NewRecorder()
	router.ServeHTTP(recMsg, reqMsg)
	if recMsg.Code != http.StatusOK {
		t.Errorf("GET /api/messages with Bearer = %d, want 200", recMsg.Code)
	}

	reqLink := httptest.NewRequest(http.MethodPost, "/api/links", strings.NewReader(`{"slug":"blog","target_url":"https://example.com"}`))
	reqLink.Header.Set("X-Admin-Key", "super-secret-admin-key")
	recLink := httptest.NewRecorder()
	router.ServeHTTP(recLink, reqLink)
	if recLink.Code != http.StatusCreated {
		t.Errorf("POST /api/links with X-Admin-Key = %d, want 201 (%s)", recLink.Code, recLink.Body.String())
	}
}

func TestContactHandler_RateLimitAndValidation(t *testing.T) {
	// Disable outbound Resend during handler test
	t.Setenv("RESEND_API_KEY", "")
	t.Setenv("CONTACT_NOTIFY_EMAIL", "")

	now := time.Unix(1700000000, 0)
	app, router := setupTestApp(t, Config{
		ContactRateLimitMax:    2,
		ContactRateLimitWindow: 10 * time.Minute,
	})
	app.contactLimiter.now = func() time.Time { return now }

	// Invalid email is rejected before DB insert
	badReq := httptest.NewRequest(http.MethodPost, "/api/contact", strings.NewReader(`{"name":"Ada","email":"not-an-email","content":"Hi"}`))
	badReq.RemoteAddr = "203.0.113.10:12345"
	badRec := httptest.NewRecorder()
	router.ServeHTTP(badRec, badReq)
	if badRec.Code != http.StatusBadRequest {
		t.Fatalf("invalid email status = %d, want 400", badRec.Code)
	}

	// Note: the invalid request above counted as hit 1 for that IP; hit 2 succeeds, hit 3 hits 429.
	validPayload := `{"name":"Ada","email":"ada@example.com","content":"Hello there"}`

	req2 := httptest.NewRequest(http.MethodPost, "/api/contact", strings.NewReader(validPayload))
	req2.RemoteAddr = "203.0.113.10:12345"
	rec2 := httptest.NewRecorder()
	router.ServeHTTP(rec2, req2)
	if rec2.Code != http.StatusCreated {
		t.Fatalf("2nd request status = %d, want 201 (%s)", rec2.Code, rec2.Body.String())
	}

	app.WaitNotifications()

	req3 := httptest.NewRequest(http.MethodPost, "/api/contact", strings.NewReader(validPayload))
	req3.RemoteAddr = "203.0.113.10:12345"
	rec3 := httptest.NewRecorder()
	router.ServeHTTP(rec3, req3)
	if rec3.Code != http.StatusTooManyRequests {
		t.Fatalf("3rd request within window = %d, want 429", rec3.Code)
	}
	if rec3.Header().Get("Retry-After") == "" {
		t.Error("expected Retry-After header on 429 response")
	}

	// Advance clock past 10-minute window -> allowed again
	now = now.Add(11 * time.Minute)
	req4 := httptest.NewRequest(http.MethodPost, "/api/contact", strings.NewReader(validPayload))
	req4.RemoteAddr = "203.0.113.10:12345"
	rec4 := httptest.NewRecorder()
	router.ServeHTTP(rec4, req4)
	if rec4.Code != http.StatusCreated {
		t.Fatalf("request after window reset = %d, want 201", rec4.Code)
	}
	app.WaitNotifications()
}

func TestCreateLinkHandler_RejectsUnsafeURLAndReservedSlug(t *testing.T) {
	t.Setenv("ADMIN_SECRET", "tok")
	_, router := setupTestApp(t, Config{
		ContactRateLimitMax:    5,
		ContactRateLimitWindow: time.Minute,
	})

	cases := []struct {
		name string
		body map[string]string
	}{
		{"javascript scheme", map[string]string{"slug": "xss", "target_url": "javascript:alert(1)"}},
		{"reserved slug api", map[string]string{"slug": "api", "target_url": "https://example.com"}},
		{"invalid chars", map[string]string{"slug": "bad/slug", "target_url": "https://example.com"}},
	}

	for _, tc := range cases {
		raw, _ := json.Marshal(tc.body)
		req := httptest.NewRequest(http.MethodPost, "/api/links", bytes.NewReader(raw))
		req.Header.Set("Authorization", "Bearer tok")
		rec := httptest.NewRecorder()
		router.ServeHTTP(rec, req)

		if rec.Code != http.StatusBadRequest {
			t.Errorf("%s: got status %d, want 400 (%s)", tc.name, rec.Code, rec.Body.String())
		}
	}
}

func TestRestoreRewrittenRoute(t *testing.T) {
	cases := []struct {
		name      string
		rawURL    string
		wantPath  string
		wantQuery string
	}{
		{
			name:      "restores api route while keeping existing query params",
			rawURL:    "/api/index?_route=/api/analytics&slug=cv&limit=50",
			wantPath:  "/api/analytics",
			wantQuery: "limit=50&slug=cv",
		},
		{
			name:      "restores /to/:slug redirect route",
			rawURL:    "/api/index?_route=/to/cv",
			wantPath:  "/to/cv",
			wantQuery: "",
		},
		{
			name:      "restores exact shortlink route",
			rawURL:    "/api/index?_route=/wa",
			wantPath:  "/wa",
			wantQuery: "",
		},
		{
			name:      "ignores invalid _route without leading slash",
			rawURL:    "/api/index?_route=not-a-path&foo=bar",
			wantPath:  "/api/index",
			wantQuery: "_route=not-a-path&foo=bar",
		},
		{
			name:      "leaves direct local request untouched",
			rawURL:    "/api/analytics?slug=gh",
			wantPath:  "/api/analytics",
			wantQuery: "slug=gh",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, tc.rawURL, nil)
			RestoreRewrittenRoute(req)
			if req.URL.Path != tc.wantPath {
				t.Errorf("Path = %q, want %q", req.URL.Path, tc.wantPath)
			}
			if req.URL.RawQuery != tc.wantQuery {
				t.Errorf("RawQuery = %q, want %q", req.URL.RawQuery, tc.wantQuery)
			}
		})
	}
}
