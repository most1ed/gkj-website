package middleware

import (
	"github.com/gofiber/fiber/v2"
)

// AuthConfig defines the config for authentication middleware
type AuthConfig struct {
	TokenLookup string
	AuthScheme  string
}

// DefaultAuthConfig is the default auth middleware config
var DefaultAuthConfig = AuthConfig{
	TokenLookup: "header:Authorization",
	AuthScheme:  "Bearer",
}

// Auth creates a new auth middleware with custom config
func Auth(config ...AuthConfig) fiber.Handler {
	// Set default config
	cfg := DefaultAuthConfig

	// Override config if provided
	if len(config) > 0 {
		cfg = config[0]
	}

	// Return middleware handler
	return func(c *fiber.Ctx) error {
		// Get token from header
		auth := c.Get("Authorization")
		if auth == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "missing authorization header",
			})
		}

		// TODO: Implement your token validation logic here
		// This is just a placeholder
		
		return c.Next()
	}
}
