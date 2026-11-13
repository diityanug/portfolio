package backend

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

const (
	defaultAnalyticsLimit = 50
	maxAnalyticsLimit     = 200
	maxHeaderStoreRunes   = 300
)

// ClickLogEntry represents a single recorded redirect event in click_logs.
type ClickLogEntry struct {
	ID            int64  `json:"id"`
	Slug          string `json:"slug"`
	Referer       string `json:"referer"`
	RefererSource string `json:"referer_source"`
	UserAgent     string `json:"user_agent"`
	DeviceType    string `json:"device_type"`
	ClickedAt     string `json:"clicked_at"`
}

// DeviceStat summarizes total recorded clicks grouped by device category.
type DeviceStat struct {
	DeviceType string `json:"device_type"`
	Clicks     int    `json:"clicks"`
}

// RefererStat summarizes total recorded clicks grouped by traffic source.
type RefererStat struct {
	Source string `json:"source"`
	Clicks int    `json:"clicks"`
}

// AnalyticsResponse is returned by GET /api/analytics.
type AnalyticsResponse struct {
	TotalClicks  int             `json:"total_clicks"`
	LoggedClicks int             `json:"logged_clicks"`
	Links        []Link          `json:"links"`
	ByDevice     []DeviceStat    `json:"by_device"`
	TopReferers  []RefererStat   `json:"top_referers"`
	RecentClicks []ClickLogEntry `json:"recent_clicks"`
}

// recordLinkClick atomically increments links.clicks and appends a detailed row
// to click_logs inside a single SQL transaction.
func (a *App) recordLinkClick(slug, rawReferer, rawUserAgent string) error {
	cleanReferer := truncateRunes(sanitizeSingleLine(rawReferer), maxHeaderStoreRunes)
	cleanUA := truncateRunes(sanitizeSingleLine(rawUserAgent), maxHeaderStoreRunes)
	refererSource := ExtractRefererSource(cleanReferer)
	deviceType := ClassifyDevice(cleanUA)

	tx, err := a.db.Begin()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	if _, err := tx.Exec("UPDATE links SET clicks = clicks + 1 WHERE slug = ?", slug); err != nil {
		return fmt.Errorf("failed to increment click counter: %w", err)
	}

	insertLog := `
		INSERT INTO click_logs (slug, referer, referer_source, user_agent, device_type)
		VALUES (?, ?, ?, ?, ?)
	`
	if _, err := tx.Exec(insertLog, slug, cleanReferer, refererSource, cleanUA, deviceType); err != nil {
		return fmt.Errorf("failed to insert click log: %w", err)
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit click transaction: %w", err)
	}
	return nil
}

// analyticsHandler returns aggregated click statistics and recent click logs
// via GET /api/analytics (supports optional ?slug=... and ?limit=...).
func (a *App) analyticsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	slugFilter := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("slug")))
	limit := parseAnalyticsLimit(r.URL.Query().Get("limit"))

	links, totalClicks, err := a.queryLinkTotals(slugFilter)
	if err != nil {
		log.Printf("Error querying link totals: %v\n", err)
		http.Error(w, `{"error": "failed to query link totals"}`, http.StatusInternalServerError)
		return
	}

	loggedClicks, err := a.queryLoggedClicksCount(slugFilter)
	if err != nil {
		log.Printf("Error querying logged click count: %v\n", err)
		http.Error(w, `{"error": "failed to query click logs"}`, http.StatusInternalServerError)
		return
	}

	byDevice, err := a.queryDeviceStats(slugFilter)
	if err != nil {
		log.Printf("Error querying device stats: %v\n", err)
		http.Error(w, `{"error": "failed to query device analytics"}`, http.StatusInternalServerError)
		return
	}

	topReferers, err := a.queryTopReferers(slugFilter)
	if err != nil {
		log.Printf("Error querying referer stats: %v\n", err)
		http.Error(w, `{"error": "failed to query referer analytics"}`, http.StatusInternalServerError)
		return
	}

	recentClicks, err := a.queryRecentClicks(slugFilter, limit)
	if err != nil {
		log.Printf("Error querying recent clicks: %v\n", err)
		http.Error(w, `{"error": "failed to query recent click logs"}`, http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(AnalyticsResponse{
		TotalClicks:  totalClicks,
		LoggedClicks: loggedClicks,
		Links:        links,
		ByDevice:     byDevice,
		TopReferers:  topReferers,
		RecentClicks: recentClicks,
	})
}

func (a *App) queryLinkTotals(slugFilter string) ([]Link, int, error) {
	rows, err := a.db.Query(
		"SELECT slug, target_url, clicks FROM links WHERE (? = '' OR slug = ?) ORDER BY clicks DESC",
		slugFilter,
		slugFilter,
	)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	links := []Link{}
	total := 0
	for rows.Next() {
		var l Link
		if err := rows.Scan(&l.Slug, &l.TargetURL, &l.Clicks); err != nil {
			return nil, 0, err
		}
		total += l.Clicks
		links = append(links, l)
	}
	return links, total, rows.Err()
}

func (a *App) queryLoggedClicksCount(slugFilter string) (int, error) {
	var count int
	err := a.db.QueryRow(
		"SELECT COUNT(*) FROM click_logs WHERE (? = '' OR slug = ?)",
		slugFilter,
		slugFilter,
	).Scan(&count)
	return count, err
}

func (a *App) queryDeviceStats(slugFilter string) ([]DeviceStat, error) {
	rows, err := a.db.Query(`
		SELECT device_type, COUNT(*) AS total
		FROM click_logs
		WHERE (? = '' OR slug = ?)
		GROUP BY device_type
		ORDER BY total DESC, device_type ASC
	`, slugFilter, slugFilter)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	stats := []DeviceStat{}
	for rows.Next() {
		var item DeviceStat
		if err := rows.Scan(&item.DeviceType, &item.Clicks); err != nil {
			return nil, err
		}
		stats = append(stats, item)
	}
	return stats, rows.Err()
}

func (a *App) queryTopReferers(slugFilter string) ([]RefererStat, error) {
	rows, err := a.db.Query(`
		SELECT referer_source, COUNT(*) AS total
		FROM click_logs
		WHERE (? = '' OR slug = ?)
		GROUP BY referer_source
		ORDER BY total DESC, referer_source ASC
		LIMIT 10
	`, slugFilter, slugFilter)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	stats := []RefererStat{}
	for rows.Next() {
		var item RefererStat
		if err := rows.Scan(&item.Source, &item.Clicks); err != nil {
			return nil, err
		}
		stats = append(stats, item)
	}
	return stats, rows.Err()
}

func (a *App) queryRecentClicks(slugFilter string, limit int) ([]ClickLogEntry, error) {
	rows, err := a.db.Query(`
		SELECT id, slug, referer, referer_source, user_agent, device_type, clicked_at
		FROM click_logs
		WHERE (? = '' OR slug = ?)
		ORDER BY id DESC
		LIMIT ?
	`, slugFilter, slugFilter, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	entries := []ClickLogEntry{}
	for rows.Next() {
		var e ClickLogEntry
		if err := rows.Scan(&e.ID, &e.Slug, &e.Referer, &e.RefererSource, &e.UserAgent, &e.DeviceType, &e.ClickedAt); err != nil {
			return nil, err
		}
		entries = append(entries, e)
	}
	return entries, rows.Err()
}

func parseAnalyticsLimit(raw string) int {
	val, err := strconv.Atoi(strings.TrimSpace(raw))
	if err != nil || val <= 0 {
		return defaultAnalyticsLimit
	}
	if val > maxAnalyticsLimit {
		return maxAnalyticsLimit
	}
	return val
}

// ExtractRefererSource normalizes a raw HTTP Referer into a clean hostname (or "Direct").
func ExtractRefererSource(rawReferer string) string {
	trimmed := strings.TrimSpace(rawReferer)
	if trimmed == "" {
		return "Direct"
	}

	parsed, err := url.Parse(trimmed)
	if err == nil {
		host := strings.ToLower(parsed.Hostname())
		host = strings.TrimPrefix(host, "www.")
		if host != "" {
			return truncateRunes(host, 100)
		}
	}

	return truncateRunes(trimmed, 100)
}

// ClassifyDevice categorizes an HTTP User-Agent string as Desktop, Mobile, Tablet, Bot, or Unknown.
func ClassifyDevice(userAgent string) string {
	ua := strings.ToLower(strings.TrimSpace(userAgent))
	if ua == "" {
		return "Unknown"
	}

	botKeywords := []string{
		"bot", "crawler", "spider", "curl/", "wget/", "postman",
		"insomnia", "python-requests", "go-http-client", "headless",
		"slurp", "facebookexternalhit", "whatsapp",
	}
	for _, kw := range botKeywords {
		if strings.Contains(ua, kw) {
			return "Bot"
		}
	}

	isAndroid := strings.Contains(ua, "android")
	if strings.Contains(ua, "ipad") || strings.Contains(ua, "tablet") || strings.Contains(ua, "kindle") ||
		strings.Contains(ua, "playbook") || strings.Contains(ua, "silk") || (isAndroid && !strings.Contains(ua, "mobile")) {
		return "Tablet"
	}

	mobileKeywords := []string{"mobi", "iphone", "ipod", "android", "blackberry", "opera mini", "iemobile"}
	for _, kw := range mobileKeywords {
		if strings.Contains(ua, kw) {
			return "Mobile"
		}
	}

	return "Desktop"
}

func truncateRunes(s string, max int) string {
	if max <= 0 {
		return ""
	}
	count := 0
	for idx := range s {
		if count == max {
			return s[:idx]
		}
		count++
	}
	return s
}
