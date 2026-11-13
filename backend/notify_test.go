package backend

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"sync/atomic"
	"testing"
	"time"
)

func TestLoadEnvFile(t *testing.T) {
	dir := t.TempDir()
	envPath := filepath.Join(dir, ".env")

	content := `
# Comment line should be ignored
RESEND_API_KEY="re_secret_123"
export CONTACT_NOTIFY_EMAIL='owner@example.com'
EMPTY_VAL=
PRE_EXISTING=from-file
`
	if err := os.WriteFile(envPath, []byte(content), 0o600); err != nil {
		t.Fatalf("failed to write temp env file: %v", err)
	}

	t.Setenv("PRE_EXISTING", "from-os")
	for _, k := range []string{"RESEND_API_KEY", "CONTACT_NOTIFY_EMAIL", "EMPTY_VAL"} {
		t.Setenv(k, "")
		_ = os.Unsetenv(k)
	}

	LoadEnvFile(filepath.Join(dir, "missing.env"), envPath)

	cases := map[string]string{
		"RESEND_API_KEY":       "re_secret_123",
		"CONTACT_NOTIFY_EMAIL": "owner@example.com",
		"EMPTY_VAL":            "",
		"PRE_EXISTING":         "from-os",
	}

	for key, want := range cases {
		if got := os.Getenv(key); got != want {
			t.Errorf("env %s = %q, want %q", key, got, want)
		}
	}
}

func TestSendEmailViaResend(t *testing.T) {
	var gotAuth, gotContentType string
	var gotBody resendEmailRequest

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			t.Errorf("method = %s, want POST", r.Method)
		}
		gotAuth = r.Header.Get("Authorization")
		gotContentType = r.Header.Get("Content-Type")
		if err := json.NewDecoder(r.Body).Decode(&gotBody); err != nil {
			t.Fatalf("failed to decode json body: %v", err)
		}
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"id":"email_123"}`))
	}))
	defer srv.Close()

	origEndpoint := resendEndpoint
	resendEndpoint = srv.URL
	defer func() { resendEndpoint = origEndpoint }()

	err := sendEmailViaResend(
		"re_test_123",
		defaultResendFromEmail,
		"owner@example.com",
		7,
		"Jane <Doe>",
		"jane@example.com",
		"Hello <script>alert(1)</script>\nLine 2",
	)
	if err != nil {
		t.Fatalf("sendEmailViaResend returned unexpected error: %v", err)
	}

	if gotAuth != "Bearer re_test_123" {
		t.Errorf("Authorization = %q, want Bearer re_test_123", gotAuth)
	}
	if gotContentType != "application/json" {
		t.Errorf("Content-Type = %q, want application/json", gotContentType)
	}
	if gotBody.From != defaultResendFromEmail {
		t.Errorf("from = %q, want %q", gotBody.From, defaultResendFromEmail)
	}
	if len(gotBody.To) != 1 || gotBody.To[0] != "owner@example.com" {
		t.Errorf("to = %v, want [owner@example.com]", gotBody.To)
	}
	if gotBody.ReplyTo != "jane@example.com" {
		t.Errorf("reply_to = %q, want jane@example.com", gotBody.ReplyTo)
	}
	if gotBody.Subject != "New Portfolio Message (#7) from Jane <Doe>" {
		t.Errorf("unexpected subject = %q", gotBody.Subject)
	}
	if strings.Contains(gotBody.HTML, "<script>") || !strings.Contains(gotBody.HTML, "&lt;script&gt;") {
		t.Errorf("expected HTML body to escape raw script tags, got: %s", gotBody.HTML)
	}
	if !strings.Contains(gotBody.HTML, "<br>Line 2") {
		t.Errorf("expected newlines converted to <br>, got: %s", gotBody.HTML)
	}
}

func TestSendEmailViaResend_HTTPError(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusUnprocessableEntity)
		_, _ = w.Write([]byte(`{"message":"API key is invalid"}`))
	}))
	defer srv.Close()

	origEndpoint := resendEndpoint
	resendEndpoint = srv.URL
	defer func() { resendEndpoint = origEndpoint }()

	err := sendEmailViaResend(
		"re_bad",
		defaultResendFromEmail,
		"owner@example.com",
		1,
		"Test",
		"test@example.com",
		"Hi",
	)
	if err == nil || !strings.Contains(err.Error(), "HTTP 422") {
		t.Fatalf("expected HTTP 422 error, got: %v", err)
	}
}

func TestSendContactNotification_DispatchesEmail(t *testing.T) {
	var called bool
	var gotBody resendEmailRequest

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		called = true
		if err := json.NewDecoder(r.Body).Decode(&gotBody); err != nil {
			t.Fatalf("decode failed: %v", err)
		}
		_, _ = w.Write([]byte(`{"id":"ok"}`))
	}))
	defer srv.Close()

	origEndpoint := resendEndpoint
	resendEndpoint = srv.URL
	defer func() { resendEndpoint = origEndpoint }()

	t.Setenv("RESEND_API_KEY", "re_live_mock")
	t.Setenv("CONTACT_NOTIFY_EMAIL", "owner@example.com")
	t.Setenv("RESEND_FROM_EMAIL", "Portfolio <hello@example.com>")

	sendContactNotification(42, "Recruiter", "recruiter@company.com", "Let's chat!")

	if !called {
		t.Fatal("expected Resend endpoint to be called")
	}
	if gotBody.From != "Portfolio <hello@example.com>" {
		t.Errorf("from = %q, want custom from env", gotBody.From)
	}
	if len(gotBody.To) != 1 || gotBody.To[0] != "owner@example.com" {
		t.Errorf("to = %v, want [owner@example.com]", gotBody.To)
	}
}

func TestSendContactNotification_SkipsWhenUnconfigured(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Fatal("Resend endpoint must not be called when env vars are missing")
	}))
	defer srv.Close()

	origEndpoint := resendEndpoint
	resendEndpoint = srv.URL
	defer func() { resendEndpoint = origEndpoint }()

	t.Setenv("RESEND_API_KEY", "")
	t.Setenv("CONTACT_NOTIFY_EMAIL", "")
	_ = os.Unsetenv("RESEND_API_KEY")
	_ = os.Unsetenv("CONTACT_NOTIFY_EMAIL")

	sendContactNotification(99, "Guest", "guest@example.com", "Hello")
}

func TestContactHandler_SyncNotifications(t *testing.T) {
	var delivered atomic.Bool
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(25 * time.Millisecond)
		delivered.Store(true)
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"id":"sync_ok"}`))
	}))
	defer srv.Close()

	origEndpoint := resendEndpoint
	resendEndpoint = srv.URL
	defer func() { resendEndpoint = origEndpoint }()

	t.Setenv("RESEND_API_KEY", "re_sync_mock")
	t.Setenv("CONTACT_NOTIFY_EMAIL", "owner@example.com")

	_, router := setupTestApp(t, Config{
		SyncNotifications:      true,
		ContactRateLimitMax:    5,
		ContactRateLimitWindow: time.Minute,
	})

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/contact",
		strings.NewReader(`{"name":"Vercel Tester","email":"tester@example.com","content":"Testing synchronous delivery"}`),
	)
	req.RemoteAddr = "198.51.100.42:5555"
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("POST /api/contact status = %d, want 201 (%s)", rec.Code, rec.Body.String())
	}
	if !delivered.Load() {
		t.Fatal("expected email notification to finish synchronously before HTTP response returned")
	}
}
