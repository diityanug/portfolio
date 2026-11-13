package backend

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func TestClassifyDevice(t *testing.T) {
	cases := []struct {
		ua   string
		want string
	}{
		{"", "Unknown"},
		{"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36", "Desktop"},
		{"Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148", "Mobile"},
		{"Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Mobile Safari/537.36", "Mobile"},
		{"Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1", "Tablet"},
		{"Mozilla/5.0 (Linux; Android 13; Tab) AppleWebKit/537.36 Safari/537.36", "Tablet"},
		{"LinkedInBot/1.0 (compatible; Mozilla/5.0)", "Bot"},
		{"curl/8.4.0", "Bot"},
	}

	for _, tc := range cases {
		if got := ClassifyDevice(tc.ua); got != tc.want {
			t.Errorf("ClassifyDevice(%q) = %q, want %q", tc.ua, got, tc.want)
		}
	}
}

func TestExtractRefererSource(t *testing.T) {
	cases := []struct {
		ref  string
		want string
	}{
		{"", "Direct"},
		{"   ", "Direct"},
		{"https://www.linkedin.com/in/diityanug/", "linkedin.com"},
		{"https://github.com/diityanug/Lenvry", "github.com"},
		{"http://localhost:5173/", "localhost"},
	}

	for _, tc := range cases {
		if got := ExtractRefererSource(tc.ref); got != tc.want {
			t.Errorf("ExtractRefererSource(%q) = %q, want %q", tc.ref, got, tc.want)
		}
	}
}

func TestClickAnalytics_RedirectAndQuery(t *testing.T) {
	t.Setenv("ADMIN_SECRET", "analytics-secret")
	_, router := setupTestApp(t, Config{
		ContactRateLimitMax:    5,
		ContactRateLimitWindow: time.Minute,
	})

	// Simulate 3 clicks across /{slug} and /to/{slug} with different referers and devices
	clicks := []struct {
		path    string
		referer string
		ua      string
	}{
		{"/cv", "https://www.linkedin.com/in/recruiter", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0"},
		{"/to/cv", "", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148"},
		{"/gh", "https://github.com/diityanug", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15"},
	}

	for _, c := range clicks {
		req := httptest.NewRequest(http.MethodGet, c.path, nil)
		if c.referer != "" {
			req.Header.Set("Referer", c.referer)
		}
		req.Header.Set("User-Agent", c.ua)
		rec := httptest.NewRecorder()
		router.ServeHTTP(rec, req)

		if rec.Code != http.StatusFound {
			t.Fatalf("GET %s status = %d, want 302", c.path, rec.Code)
		}
	}

	// Unauthenticated /api/analytics must fail with 401
	unauthReq := httptest.NewRequest(http.MethodGet, "/api/analytics", nil)
	unauthRec := httptest.NewRecorder()
	router.ServeHTTP(unauthRec, unauthReq)
	if unauthRec.Code != http.StatusUnauthorized {
		t.Fatalf("unauthenticated /api/analytics = %d, want 401", unauthRec.Code)
	}

	// Authenticated full analytics query
	authReq := httptest.NewRequest(http.MethodGet, "/api/analytics", nil)
	authReq.Header.Set("Authorization", "Bearer analytics-secret")
	authRec := httptest.NewRecorder()
	router.ServeHTTP(authRec, authReq)
	if authRec.Code != http.StatusOK {
		t.Fatalf("GET /api/analytics status = %d, want 200 (%s)", authRec.Code, authRec.Body.String())
	}

	var all AnalyticsResponse
	if err := json.NewDecoder(authRec.Body).Decode(&all); err != nil {
		t.Fatalf("failed to decode analytics JSON: %v", err)
	}

	if all.TotalClicks != 3 || all.LoggedClicks != 3 {
		t.Errorf("got TotalClicks=%d LoggedClicks=%d, want 3, 3", all.TotalClicks, all.LoggedClicks)
	}
	if len(all.RecentClicks) != 3 {
		t.Fatalf("got %d recent clicks, want 3", len(all.RecentClicks))
	}
	if all.RecentClicks[0].Slug != "gh" || all.RecentClicks[0].RefererSource != "github.com" {
		t.Errorf("most recent click = %+v, want slug=gh source=github.com", all.RecentClicks[0])
	}

	// Filtered by ?slug=cv&limit=1
	cvReq := httptest.NewRequest(http.MethodGet, "/api/analytics?slug=cv&limit=1", nil)
	cvReq.Header.Set("X-Admin-Key", "analytics-secret")
	cvRec := httptest.NewRecorder()
	router.ServeHTTP(cvRec, cvReq)
	if cvRec.Code != http.StatusOK {
		t.Fatalf("GET /api/analytics?slug=cv status = %d, want 200", cvRec.Code)
	}

	var cv AnalyticsResponse
	if err := json.NewDecoder(cvRec.Body).Decode(&cv); err != nil {
		t.Fatalf("failed to decode filtered analytics JSON: %v", err)
	}
	if cv.TotalClicks != 2 || cv.LoggedClicks != 2 {
		t.Errorf("filtered /cv got TotalClicks=%d LoggedClicks=%d, want 2, 2", cv.TotalClicks, cv.LoggedClicks)
	}
	if len(cv.RecentClicks) != 1 {
		t.Errorf("limit=1 returned %d rows, want 1", len(cv.RecentClicks))
	}
}
