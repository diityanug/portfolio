package handler

import (
	"log"
	"net/http"
	"os"
	"sync"

	"portfolio/backend"
)

var (
	appMu        sync.Mutex
	cachedApp    *backend.App
	cachedRouter http.Handler
)

func getRouter() (http.Handler, error) {
	appMu.Lock()
	defer appMu.Unlock()

	if cachedRouter != nil {
		return cachedRouter, nil
	}

	db, driver, err := backend.OpenAndInitDB(backend.DBConfig{
		TursoURL:       os.Getenv("TURSO_DATABASE_URL"),
		TursoAuthToken: os.Getenv("TURSO_AUTH_TOKEN"),
	})
	if err != nil {
		return nil, err
	}

	log.Printf("[VERCEL] Connected portfolio backend database (driver: %s)", driver)
	cachedApp = backend.NewApp(db, backend.Config{
		SyncNotifications: true,
	})
	cachedRouter = cachedApp.Router()
	return cachedRouter, nil
}

// Handler is the Vercel Go Serverless Function entrypoint.
func Handler(w http.ResponseWriter, r *http.Request) {
	backend.RestoreRewrittenRoute(r)

	router, err := getRouter()
	if err != nil {
		log.Printf("[VERCEL] Backend initialization failed: %v", err)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusServiceUnavailable)
		_, _ = w.Write([]byte(`{"error": "database connection unavailable"}`))
		return
	}

	router.ServeHTTP(w, r)
}
