package backend

import (
	"bufio"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"html"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

const defaultResendFromEmail = "Portfolio Contact <onboarding@resend.dev>"

var (
	notifyHTTPClient = &http.Client{Timeout: 10 * time.Second}
	resendEndpoint   = "https://api.resend.com/emails"
)

type resendEmailRequest struct {
	From    string   `json:"from"`
	To      []string `json:"to"`
	ReplyTo string   `json:"reply_to,omitempty"`
	Subject string   `json:"subject"`
	Text    string   `json:"text"`
	HTML    string   `json:"html"`
}

// LoadEnvFile reads key=value pairs from .env files into process environment
// variables without overriding variables that are already set.
func LoadEnvFile(paths ...string) {
	for _, path := range paths {
		file, err := os.Open(path)
		if err != nil {
			if !errors.Is(err, os.ErrNotExist) {
				log.Printf("[ENV] Failed to open %s: %v", path, err)
			}
			continue
		}

		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			line := strings.TrimSpace(scanner.Text())
			if line == "" || strings.HasPrefix(line, "#") {
				continue
			}

			line = strings.TrimPrefix(line, "export ")
			key, val, found := strings.Cut(line, "=")
			if !found {
				continue
			}

			key = strings.TrimSpace(key)
			val = strings.TrimSpace(val)
			if len(val) >= 2 && ((val[0] == '"' && val[len(val)-1] == '"') || (val[0] == '\'' && val[len(val)-1] == '\'')) {
				val = val[1 : len(val)-1]
			}

			if key == "" {
				continue
			}
			if _, exists := os.LookupEnv(key); !exists {
				_ = os.Setenv(key, val)
			}
		}

		if err := scanner.Err(); err != nil {
			log.Printf("[ENV] Error reading %s: %v", path, err)
		}
		_ = file.Close()
	}
}

func (a *App) dispatchContactNotification(id int64, name, email, content string) {
	if a.syncNotifications {
		sendContactNotification(id, name, email, content)
		return
	}

	a.notifyWG.Add(1)
	go func() {
		defer a.notifyWG.Done()
		sendContactNotification(id, name, email, content)
	}()
}

// WaitNotifications blocks until all in-flight async notifications complete.
func (a *App) WaitNotifications() {
	a.notifyWG.Wait()
}

func sendContactNotification(id int64, name, email, content string) {
	resendKey := strings.TrimSpace(os.Getenv("RESEND_API_KEY"))
	notifyEmail := strings.TrimSpace(os.Getenv("CONTACT_NOTIFY_EMAIL"))

	if resendKey == "" && notifyEmail == "" {
		log.Printf("[NOTIFY] Skipped email alert: set RESEND_API_KEY and CONTACT_NOTIFY_EMAIL in environment to enable real-time email alerts")
		return
	}
	if resendKey == "" || notifyEmail == "" {
		log.Printf("[NOTIFY] Email alert skipped: both RESEND_API_KEY and CONTACT_NOTIFY_EMAIL must be set")
		return
	}

	fromEmail := strings.TrimSpace(os.Getenv("RESEND_FROM_EMAIL"))
	if fromEmail == "" {
		fromEmail = defaultResendFromEmail
	}

	if err := sendEmailViaResend(resendKey, fromEmail, notifyEmail, id, name, email, content); err != nil {
		log.Printf("[NOTIFY] Email (Resend) delivery failed: %v", err)
	}
}

func sendEmailViaResend(apiKey, fromEmail, toEmail string, id int64, name, senderEmail, content string) error {
	cleanName := sanitizeSingleLine(name)
	cleanSenderEmail := sanitizeSingleLine(senderEmail)

	subject := fmt.Sprintf("New Portfolio Message (#%d) from %s", id, cleanName)
	textBody := fmt.Sprintf(
		"New portfolio contact message (#%d)\n\nFrom: %s\nEmail: %s\n\nMessage:\n%s",
		id,
		cleanName,
		cleanSenderEmail,
		content,
	)

	escapedHTMLContent := strings.ReplaceAll(html.EscapeString(content), "\n", "<br>")
	htmlBody := fmt.Sprintf(
		"<div style=\"font-family:sans-serif;line-height:1.6;color:#111\">"+
			"<h2 style=\"margin:0 0 12px\">New Portfolio Message (#%d)</h2>"+
			"<p style=\"margin:4px 0\"><strong>From:</strong> %s</p>"+
			"<p style=\"margin:4px 0\"><strong>Email:</strong> %s</p>"+
			"<hr style=\"border:none;border-top:1px solid #e5e7eb;margin:16px 0\" />"+
			"<p style=\"margin:0\">%s</p>"+
			"</div>",
		id,
		html.EscapeString(cleanName),
		html.EscapeString(cleanSenderEmail),
		escapedHTMLContent,
	)

	payload, err := json.Marshal(resendEmailRequest{
		From:    fromEmail,
		To:      []string{toEmail},
		ReplyTo: cleanSenderEmail,
		Subject: subject,
		Text:    textBody,
		HTML:    htmlBody,
	})
	if err != nil {
		return fmt.Errorf("failed to marshal resend payload: %w", err)
	}

	req, err := http.NewRequest(http.MethodPost, resendEndpoint, bytes.NewReader(payload))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := notifyHTTPClient.Do(req)
	if err != nil {
		return fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(io.LimitReader(resp.Body, 4096))
	if err != nil {
		return fmt.Errorf("failed to read response body: %w", err)
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("HTTP %d: %s", resp.StatusCode, strings.TrimSpace(string(respBody)))
	}

	log.Printf("[NOTIFY] Email alert sent via Resend (status %d)", resp.StatusCode)
	return nil
}

func sanitizeSingleLine(s string) string {
	return strings.TrimSpace(strings.NewReplacer("\r", " ", "\n", " ").Replace(s))
}
