package backend

import (
	"crypto/subtle"
	"net"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

const (
	// DefaultContactRateLimitMax caps contact submissions per IP per window.
	DefaultContactRateLimitMax = 5
	// DefaultContactRateLimitWindow defines the sliding window for contact rate limiting.
	DefaultContactRateLimitWindow = 10 * time.Minute
)

// rateLimiter tracks sliding-window request counts per client key (typically IP).
type rateLimiter struct {
	mu     sync.Mutex
	hits   map[string][]time.Time
	max    int
	window time.Duration
	now    func() time.Time
}

func newRateLimiter(max int, window time.Duration) *rateLimiter {
	return &rateLimiter{
		hits:   make(map[string][]time.Time),
		max:    max,
		window: window,
		now:    time.Now,
	}
}

func (rl *rateLimiter) allow(key string) (bool, int) {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := rl.now()
	cutoff := now.Add(-rl.window)

	// Opportunistic cleanup so stale IP buckets do not accumulate unboundedly.
	if len(rl.hits) > 1000 {
		for k, times := range rl.hits {
			pruned := pruneTimestamps(times, cutoff)
			if len(pruned) == 0 {
				delete(rl.hits, k)
			} else {
				rl.hits[k] = pruned
			}
		}
	}

	recent := pruneTimestamps(rl.hits[key], cutoff)
	if len(recent) >= rl.max {
		rl.hits[key] = recent
		waitSeconds := int(recent[0].Add(rl.window).Sub(now).Seconds()) + 1
		if waitSeconds < 1 {
			waitSeconds = 1
		}
		return false, waitSeconds
	}

	recent = append(recent, now)
	rl.hits[key] = recent
	return true, 0
}

func pruneTimestamps(times []time.Time, cutoff time.Time) []time.Time {
	kept := times[:0]
	for _, t := range times {
		if t.After(cutoff) {
			kept = append(kept, t)
		}
	}
	return kept
}

func extractClientIP(r *http.Request) string {
	if xff := strings.TrimSpace(r.Header.Get("X-Forwarded-For")); xff != "" {
		first, _, _ := strings.Cut(xff, ",")
		if ip := strings.TrimSpace(first); ip != "" {
			return ip
		}
	}

	if xri := strings.TrimSpace(r.Header.Get("X-Real-IP")); xri != "" {
		return xri
	}

	host, _, err := net.SplitHostPort(strings.TrimSpace(r.RemoteAddr))
	if err == nil && host != "" {
		return host
	}
	if addr := strings.TrimSpace(r.RemoteAddr); addr != "" {
		return addr
	}
	return "unknown"
}

// requireAdminAuth protects sensitive admin endpoints using ADMIN_SECRET via
// either "Authorization: Bearer <token>" or "X-Admin-Key: <token>".
func requireAdminAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Key")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Content-Type", "application/json")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		expected := strings.TrimSpace(os.Getenv("ADMIN_SECRET"))
		if expected == "" {
			http.Error(
				w,
				`{"error": "admin endpoint is disabled: ADMIN_SECRET is not configured"}`,
				http.StatusServiceUnavailable,
			)
			return
		}

		provided := extractAdminToken(r)
		if len(provided) == 0 || subtle.ConstantTimeCompare([]byte(provided), []byte(expected)) != 1 {
			w.Header().Set("WWW-Authenticate", `Bearer realm="portfolio-admin"`)
			http.Error(
				w,
				`{"error": "unauthorized: valid admin token required"}`,
				http.StatusUnauthorized,
			)
			return
		}

		next(w, r)
	}
}

func extractAdminToken(r *http.Request) string {
	if auth := strings.TrimSpace(r.Header.Get("Authorization")); auth != "" {
		parts := strings.Fields(auth)
		if len(parts) == 2 && strings.EqualFold(parts[0], "Bearer") {
			return strings.TrimSpace(parts[1])
		}
	}

	if key := strings.TrimSpace(r.Header.Get("X-Admin-Key")); key != "" {
		return key
	}

	return ""
}

// rateLimitMiddleware enforces a per-IP rate limit on public write endpoints.
func rateLimitMiddleware(rl *rateLimiter, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			next(w, r)
			return
		}

		if rl != nil {
			allowed, retryAfter := rl.allow(extractClientIP(r))
			if !allowed {
				w.Header().Set("Access-Control-Allow-Origin", "*")
				w.Header().Set("Content-Type", "application/json")
				w.Header().Set("Retry-After", strconv.Itoa(retryAfter))
				http.Error(
					w,
					`{"error": "too many requests, please wait a few minutes before sending another message"}`,
					http.StatusTooManyRequests,
				)
				return
			}
		}

		next(w, r)
	}
}

// RestoreRewrittenRoute restores the original request path when Vercel rewrites
// requests to `/api/index?_route=...` before dispatching through the router.
func RestoreRewrittenRoute(r *http.Request) {
	q := r.URL.Query()
	route := strings.TrimSpace(q.Get("_route"))
	if route == "" || !strings.HasPrefix(route, "/") {
		return
	}

	q.Del("_route")
	r.URL.Path = route
	r.URL.RawQuery = q.Encode()
}
