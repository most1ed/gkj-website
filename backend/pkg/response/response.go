package response

import "github.com/gofiber/fiber/v2"

// Response is a standard API response structure
type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string     `json:"error,omitempty"`
}

// Success returns a success response
func Success(c *fiber.Ctx, data interface{}) error {
	return c.JSON(Response{
		Success: true,
		Data:    data,
	})
}

// Error returns an error response
func Error(c *fiber.Ctx, statusCode int, message string) error {
	return c.Status(statusCode).JSON(Response{
		Success: false,
		Error:   message,
	})
}

// ValidationError returns a validation error response
func ValidationError(c *fiber.Ctx, errors map[string]string) error {
	return c.Status(fiber.StatusBadRequest).JSON(Response{
		Success: false,
		Error:   "Validation failed",
		Data:    errors,
	})
}
