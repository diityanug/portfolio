package backend

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/tursodatabase/libsql-client-go/libsql"
	_ "modernc.org/sqlite" // Pure-Go local SQLite fallback driver
)

// DBConfig controls whether the backend connects to Turso Cloud (when TursoURL
// is non-empty) or falls back to a local SQLite file.
type DBConfig struct {
	TursoURL       string
	TursoAuthToken string
	LocalDBPath    string
}

// DefaultShortlinks lists the initial portfolio redirect links seeded once into links.
var DefaultShortlinks = []Link{
	{Slug: "wa", TargetURL: "https://wa.me/6281916713311"},
	{Slug: "cv", TargetURL: "https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing"},
	{Slug: "resume", TargetURL: "https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing"},
	{Slug: "in", TargetURL: "https://linkedin.com/in/diityanug"},
	{Slug: "linkedin", TargetURL: "https://linkedin.com/in/diityanug"},
	{Slug: "gh", TargetURL: "https://github.com/diityanug"},
	{Slug: "github", TargetURL: "https://github.com/diityanug"},
	{Slug: "game", TargetURL: "https://github.com/diityanug/game-genre-classifier"},
	{Slug: "lenvry", TargetURL: "https://github.com/diityanug/Lenvry"},
	{Slug: "reka", TargetURL: "https://github.com/diityanug/REKA"},
}

// ResolveLocalDBPath picks the local SQLite database path cleanly whether the
// server is launched from inside `server/` (`go run .`) or from repo root (`go run ./server`).
func ResolveLocalDBPath() string {
	if _, err := os.Stat("portfolio.db"); err == nil {
		return "portfolio.db"
	}
	if info, err := os.Stat("server"); err == nil && info.IsDir() {
		return "server/portfolio.db"
	}
	return "portfolio.db"
}

// OpenAndInitDB opens either Turso Cloud (via HTTPS libSQL) or local SQLite,
// ensures all schema tables exist, and seeds default links if empty.
// Returns the opened *sql.DB, active driver label ("turso" or "sqlite"), and error.
func OpenAndInitDB(cfg DBConfig) (*sql.DB, string, error) {
	tursoURL := strings.TrimSpace(cfg.TursoURL)
	authToken := strings.TrimSpace(cfg.TursoAuthToken)

	if tursoURL != "" {
		opts := []libsql.Option{}
		if authToken != "" {
			opts = append(opts, libsql.WithAuthToken(authToken))
		}
		connector, err := libsql.NewConnector(tursoURL, opts...)
		if err != nil {
			return nil, "", fmt.Errorf("failed to configure Turso connector: %w", err)
		}

		db := sql.OpenDB(connector)
		if err := db.Ping(); err != nil {
			_ = db.Close()
			return nil, "", fmt.Errorf("failed to connect to Turso database: %w", err)
		}

		if err := initSchema(db, false); err != nil {
			_ = db.Close()
			return nil, "", err
		}
		return db, "turso", nil
	}

	localPath := strings.TrimSpace(cfg.LocalDBPath)
	if localPath == "" {
		return nil, "", fmt.Errorf("database configuration missing: set TURSO_DATABASE_URL or LocalDBPath")
	}

	db, err := sql.Open("sqlite", localPath)
	if err != nil {
		return nil, "", fmt.Errorf("failed to open local sqlite database: %w", err)
	}

	if err := initSchema(db, true); err != nil {
		_ = db.Close()
		return nil, "", err
	}
	return db, "sqlite", nil
}

func initSchema(db *sql.DB, isLocalSQLite bool) error {
	if isLocalSQLite {
		if _, err := db.Exec("PRAGMA foreign_keys = ON"); err != nil {
			return fmt.Errorf("failed to enable SQLite foreign keys: %w", err)
		}
		if _, err := db.Exec("PRAGMA busy_timeout = 5000"); err != nil {
			return fmt.Errorf("failed to set SQLite busy_timeout: %w", err)
		}
	}

	// Fast path for warm/already-migrated serverless cold starts: check existing tables in 1 round-trip.
	var tableCount int
	if err := db.QueryRow(`
		SELECT COUNT(*) FROM sqlite_master
		WHERE type = 'table' AND name IN ('links', 'messages', 'click_logs')
	`).Scan(&tableCount); err != nil {
		return fmt.Errorf("failed to inspect database tables: %w", err)
	}

	if tableCount < 3 {
		statements := []struct {
			name string
			sql  string
		}{
			{
				name: "links table",
				sql: `CREATE TABLE IF NOT EXISTS links (
					slug TEXT PRIMARY KEY,
					target_url TEXT NOT NULL,
					clicks INTEGER DEFAULT 0
				)`,
			},
			{
				name: "messages table",
				sql: `CREATE TABLE IF NOT EXISTS messages (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					name TEXT NOT NULL,
					email TEXT NOT NULL,
					content TEXT NOT NULL,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP
				)`,
			},
			{
				name: "click_logs table",
				sql: `CREATE TABLE IF NOT EXISTS click_logs (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					slug TEXT NOT NULL,
					referer TEXT NOT NULL DEFAULT '',
					referer_source TEXT NOT NULL DEFAULT 'Direct',
					user_agent TEXT NOT NULL DEFAULT '',
					device_type TEXT NOT NULL DEFAULT 'Unknown',
					clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
					FOREIGN KEY (slug) REFERENCES links(slug) ON DELETE CASCADE
				)`,
			},
			{
				name: "click_logs index",
				sql:  `CREATE INDEX IF NOT EXISTS idx_click_logs_slug_clicked_at ON click_logs(slug, clicked_at DESC)`,
			},
		}

		for _, stmt := range statements {
			if _, err := db.Exec(stmt.sql); err != nil {
				return fmt.Errorf("failed to create %s: %w", stmt.name, err)
			}
		}
	}

	return seedDefaultLinks(db)
}

func seedDefaultLinks(db *sql.DB) error {
	var linkCount int
	if err := db.QueryRow("SELECT COUNT(*) FROM links").Scan(&linkCount); err == nil && linkCount >= len(DefaultShortlinks) {
		return nil
	}

	placeholders := make([]string, 0, len(DefaultShortlinks))
	args := make([]any, 0, len(DefaultShortlinks)*2)
	for _, link := range DefaultShortlinks {
		placeholders = append(placeholders, "(?, ?, 0)")
		args = append(args, link.Slug, link.TargetURL)
	}

	query := "INSERT OR IGNORE INTO links (slug, target_url, clicks) VALUES " + strings.Join(placeholders, ", ")
	if _, err := db.Exec(query, args...); err != nil {
		log.Printf("Warning: failed to seed default shortlinks: %v\n", err)
	}
	return nil
}
