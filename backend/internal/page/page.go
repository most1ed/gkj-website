package page

import (
	"encoding/json"
	"time"
)

type Page struct {
	ID        string          `json:"id" db:"id"`
	Title     string          `json:"title" db:"title"`
	Content   json.RawMessage `json:"content" db:"content"`
	Type      string          `json:"type" db:"type"`
	AuthorID  string          `json:"authorId,omitempty" db:"author_id"`
	CreatedAt time.Time       `json:"createdAt" db:"created_at"`
	UpdatedAt time.Time       `json:"updatedAt" db:"updated_at"`
}

type PageService interface {
	Create(page *Page) error
	GetByID(id string) (*Page, error)
	List(filter *PageFilter) ([]Page, error)
	Update(page *Page) error
	Delete(id string) error
}

type PageFilter struct {
	Type       string
	AuthorID   string
	CreatedAfter *time.Time
	CreatedBefore *time.Time
}

// Implement basic validation
func (p *Page) Validate() error {
	if p.Title == "" {
		return ErrInvalidPage("Title is required")
	}

	if p.Type == "" {
		p.Type = "DRAFT"
	}

	return nil
}

// Custom error type for page-related errors
type PageError struct {
	Message string
}

func (e PageError) Error() string {
	return e.Message
}

func ErrInvalidPage(msg string) error {
	return PageError{Message: msg}
}
