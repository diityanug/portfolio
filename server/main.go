package main

import (
	"log"
	"net/http"
	"os"

	"portfolio/backend"
)

func main() {
	backend.LoadEnvFile(".env", "server/.env")

	db, driver, err := backend.OpenAndInitDB(backend.DBConfig{
		TursoURL:       os.Getenv("TURSO_DATABASE_URL"),
		TursoAuthToken: os.Getenv("TURSO_AUTH_TOKEN"),
		LocalDBPath:    backend.ResolveLocalDBPath(),
	})
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer func() {
		if err := db.Close(); err != nil {
			log.Printf("Warning: error closing database: %v", err)
		}
	}()

	app := backend.NewApp(db, backend.Config{
		SyncNotifications: false,
	})

	port := ":8080"
	log.Printf("Portfolio Go Backend Server starting on http://localhost%s (database: %s)", port, driver)
	if err := http.ListenAndServe(port, app.Router()); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
