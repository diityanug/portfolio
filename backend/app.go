package backend

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/mail"
	"net/url"
	"strings"
	"sync"
	"time"
	"unicode/utf8"
)

const (
	maxContactBodyBytes = 16 * 1024
	maxLinkBodyBytes    = 8 * 1024
	maxNameRunes        = 100
	maxEmailLength      = 254
	maxContentRunes     = 5000
	maxSlugLength       = 64
)

// Link represents a shortlink record in the database.
type Link struct {
	Slug      string `json:"slug"`
	TargetURL string `json:"target_url"`
	Clicks    int    `json:"clicks"`
}

// CreateLinkRequest represents the JSON body when creating a shortlink.
type CreateLinkRequest struct {
	Slug      string `json:"slug"`
	TargetURL string `json:"target_url"`
}

// ContactMessage represents a visitor message saved in the database.
type ContactMessage struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
}

// ContactRequest represents the incoming JSON payload from the contact form.
type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Content string `json:"content"`
}

// Config configures runtime behavior of App for local vs serverless environments.
type Config struct {
	SyncNotifications      bool
	ContactRateLimitMax    int
	ContactRateLimitWindow time.Duration
}

// App encapsulates database access, rate limiting, and HTTP handlers.
type App struct {
	db                *sql.DB
	contactLimiter    *rateLimiter
	syncNotifications bool
	notifyWG          sync.WaitGroup
}

// NewApp constructs a portfolio backend App instance.
func NewApp(db *sql.DB, cfg Config) *App {
	maxHits := cfg.ContactRateLimitMax
	if maxHits <= 0 {
		maxHits = DefaultContactRateLimitMax
	}
	window := cfg.ContactRateLimitWindow
	if window <= 0 {
		window = DefaultContactRateLimitWindow
	}

	return &App{
		db:                db,
		contactLimiter:    newRateLimiter(maxHits, window),
		syncNotifications: cfg.SyncNotifications,
	}
}

// Router returns an http.Handler wired with all portfolio API and redirect routes.
func (a *App) Router() http.Handler {
	mux := http.NewServeMux()

	// 1. Root & Health Check
	mux.HandleFunc("GET /{$}", homeHandler)

	// 2. Protected Admin Endpoints (require ADMIN_SECRET)
	mux.HandleFunc("GET /api/stats", requireAdminAuth(a.statsHandler))
	mux.HandleFunc("OPTIONS /api/stats", requireAdminAuth(a.statsHandler))
	mux.HandleFunc("GET /api/analytics", requireAdminAuth(a.analyticsHandler))
	mux.HandleFunc("OPTIONS /api/analytics", requireAdminAuth(a.analyticsHandler))
	mux.HandleFunc("POST /api/links", requireAdminAuth(a.createLinkHandler))
	mux.HandleFunc("OPTIONS /api/links", requireAdminAuth(a.createLinkHandler))
	mux.HandleFunc("GET /api/messages", requireAdminAuth(a.getMessagesHandler))
	mux.HandleFunc("OPTIONS /api/messages", requireAdminAuth(a.getMessagesHandler))

	// 3. Public Contact Endpoint (rate-limited per IP)
	mux.HandleFunc("POST /api/contact", rateLimitMiddleware(a.contactLimiter, a.contactHandler))
	mux.HandleFunc("OPTIONS /api/contact", a.contactHandler)

	// 4. Public Shortlink Redirects: /{slug} and /to/{slug}
	mux.HandleFunc("GET /{slug}", a.redirectHandler)
	mux.HandleFunc("GET /to/{slug}", a.redirectHandler)

	return mux
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Portfolio Backend API is running smoothly!")
}

func (a *App) redirectHandler(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")
	if slug == "" {
		homeHandler(w, r)
		return
	}

	normalizedSlug := strings.ToLower(slug)
	var targetURL string
	err := a.db.QueryRow("SELECT target_url FROM links WHERE slug = ?", normalizedSlug).Scan(&targetURL)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			http.NotFound(w, r)
			return
		}
		log.Printf("Error querying shortlink %s: %v\n", normalizedSlug, err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	referer := r.Referer()
	userAgent := r.UserAgent()
	if err := a.recordLinkClick(normalizedSlug, referer, userAgent); err != nil {
		log.Printf("Warning: failed to record click analytics for %s: %v\n", normalizedSlug, err)
	} else {
		log.Printf("[REDIRECT] Clicked: /%s -> %s (device=%s, source=%s)\n", normalizedSlug, targetURL, ClassifyDevice(userAgent), ExtractRefererSource(referer))
	}

	http.Redirect(w, r, targetURL, http.StatusFound)
}

func (a *App) statsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	rows, err := a.db.Query("SELECT slug, target_url, clicks FROM links ORDER BY clicks DESC")
	if err != nil {
		http.Error(w, `{"error": "failed to query links"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	links := []Link{}
	for rows.Next() {
		var l Link
		if err := rows.Scan(&l.Slug, &l.TargetURL, &l.Clicks); err != nil {
			log.Printf("Error scanning row: %v\n", err)
			continue
		}
		links = append(links, l)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Error during rows iteration: %v\n", err)
		http.Error(w, `{"error": "error reading rows"}`, http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(links)
}

func (a *App) createLinkHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	r.Body = http.MaxBytesReader(w, r.Body, maxLinkBodyBytes)

	var req CreateLinkRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		var maxBytesErr *http.MaxBytesError
		if errors.As(err, &maxBytesErr) {
			http.Error(w, `{"error": "request body too large"}`, http.StatusRequestEntityTooLarge)
			return
		}
		http.Error(w, `{"error": "invalid JSON payload"}`, http.StatusBadRequest)
		return
	}

	slug := strings.ToLower(strings.TrimSpace(req.Slug))
	targetURL := strings.TrimSpace(req.TargetURL)

	if !isValidSlug(slug) {
		http.Error(w, `{"error": "slug must be 1-64 characters using lowercase letters, numbers, hyphens, or underscores"}`, http.StatusBadRequest)
		return
	}
	if !isValidHTTPURL(targetURL) {
		http.Error(w, `{"error": "target_url must be a valid http or https URL"}`, http.StatusBadRequest)
		return
	}

	if _, err := a.db.Exec("INSERT INTO links (slug, target_url, clicks) VALUES (?, ?, 0)", slug, targetURL); err != nil {
		http.Error(w, `{"error": "slug already exists or database error"}`, http.StatusConflict)
		return
	}

	log.Printf("[NEW LINK] Added: /%s -> %s\n", slug, targetURL)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message":    "Shortlink created successfully",
		"slug":       slug,
		"target_url": targetURL,
	})
}

func (a *App) contactHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, maxContactBodyBytes)

	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		var maxBytesErr *http.MaxBytesError
		if errors.As(err, &maxBytesErr) {
			http.Error(w, `{"error": "message payload is too large"}`, http.StatusRequestEntityTooLarge)
			return
		}
		http.Error(w, `{"error": "invalid JSON payload"}`, http.StatusBadRequest)
		return
	}

	name := strings.TrimSpace(req.Name)
	email := strings.TrimSpace(req.Email)
	content := strings.TrimSpace(req.Content)

	if name == "" || email == "" || content == "" {
		http.Error(w, `{"error": "all fields (name, email, content) are required"}`, http.StatusBadRequest)
		return
	}
	if utf8.RuneCountInString(name) > maxNameRunes {
		http.Error(w, `{"error": "name must be 100 characters or fewer"}`, http.StatusBadRequest)
		return
	}
	if !isValidEmail(email) {
		http.Error(w, `{"error": "please provide a valid email address"}`, http.StatusBadRequest)
		return
	}
	if utf8.RuneCountInString(content) > maxContentRunes {
		http.Error(w, `{"error": "message must be 5000 characters or fewer"}`, http.StatusBadRequest)
		return
	}

	res, err := a.db.Exec("INSERT INTO messages (name, email, content) VALUES (?, ?, ?)", name, email, content)
	if err != nil {
		log.Printf("Error saving message: %v\n", err)
		http.Error(w, `{"error": "failed to save message to database"}`, http.StatusInternalServerError)
		return
	}

	msgID, _ := res.LastInsertId()

	log.Printf("\n========================================\n🔔 NEW CONTACT MESSAGE (ID: %d)\nFrom: %s <%s>\nMessage:\n%s\n========================================\n", msgID, name, email, content)

	a.dispatchContactNotification(msgID, name, email, content)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]any{
		"success": true,
		"message": "Thank you! Your message has been received successfully.",
		"id":      msgID,
	})
}

func (a *App) getMessagesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	rows, err := a.db.Query("SELECT id, name, email, content, created_at FROM messages ORDER BY id DESC")
	if err != nil {
		http.Error(w, `{"error": "failed to query messages"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	messages := []ContactMessage{}
	for rows.Next() {
		var m ContactMessage
		if err := rows.Scan(&m.ID, &m.Name, &m.Email, &m.Content, &m.CreatedAt); err != nil {
			log.Printf("Error scanning message row: %v\n", err)
			continue
		}
		messages = append(messages, m)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, `{"error": "error reading messages"}`, http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(messages)
}

func isValidEmail(email string) bool {
	if len(email) > maxEmailLength {
		return false
	}
	parsed, err := mail.ParseAddress(email)
	if err != nil || parsed.Address != email {
		return false
	}
	_, domain, found := strings.Cut(parsed.Address, "@")
	return found && strings.Contains(domain, ".")
}

func isValidSlug(slug string) bool {
	if slug == "" || len(slug) > maxSlugLength {
		return false
	}
	switch slug {
	case "api", "to", "admin":
		return false
	}
	for _, ch := range slug {
		isLower := ch >= 'a' && ch <= 'z'
		isDigit := ch >= '0' && ch <= '9'
		if !isLower && !isDigit && ch != '-' && ch != '_' {
			return false
		}
	}
	return true
}

func isValidHTTPURL(raw string) bool {
	parsed, err := url.Parse(raw)
	if err != nil {
		return false
	}
	return (parsed.Scheme == "http" || parsed.Scheme == "https") && parsed.Host != ""
}
