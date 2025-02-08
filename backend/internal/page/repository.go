package page

import (
	"database/sql"
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

type PostgresPageRepository struct {
	db *sql.DB
}

func NewPostgresPageRepository(db *sql.DB) *PostgresPageRepository {
	return &PostgresPageRepository{db: db}
}

func (r *PostgresPageRepository) Create(page *Page) error {
	if err := page.Validate(); err != nil {
		return err
	}

	// Generate UUID if not provided
	if page.ID == "" {
		page.ID = uuid.New().String()
	}

	// Set timestamps
	now := time.Now()
	page.CreatedAt = now
	page.UpdatedAt = now

	// Convert content to JSON
	contentJSON, err := json.Marshal(page.Content)
	if err != nil {
		return err
	}

	query := `
		INSERT INTO pages (id, title, content, type, author_id, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`

	_, err = r.db.Exec(
		query, 
		page.ID, 
		page.Title, 
		contentJSON, 
		page.Type, 
		page.AuthorID, 
		page.CreatedAt, 
		page.UpdatedAt,
	)

	return err
}

func (r *PostgresPageRepository) GetByID(id string) (*Page, error) {
	query := `
		SELECT id, title, content, type, author_id, created_at, updated_at
		FROM pages
		WHERE id = $1
	`

	var page Page
	var contentJSON []byte

	err := r.db.QueryRow(query, id).Scan(
		&page.ID, 
		&page.Title, 
		&contentJSON, 
		&page.Type, 
		&page.AuthorID, 
		&page.CreatedAt, 
		&page.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	// Unmarshal content
	page.Content = contentJSON

	return &page, nil
}

func (r *PostgresPageRepository) List(filter *PageFilter) ([]Page, error) {
	query := `
		SELECT id, title, content, type, author_id, created_at, updated_at
		FROM pages
		WHERE 1=1
	`
	var args []interface{}
	argIndex := 1

	// Build dynamic query based on filter
	if filter != nil {
		if filter.Type != "" {
			query += " AND type = $" + string(argIndex+'0')
			args = append(args, filter.Type)
			argIndex++
		}

		if filter.AuthorID != "" {
			query += " AND author_id = $" + string(argIndex+'0')
			args = append(args, filter.AuthorID)
			argIndex++
		}

		if filter.CreatedAfter != nil {
			query += " AND created_at >= $" + string(argIndex+'0')
			args = append(args, filter.CreatedAfter)
			argIndex++
		}

		if filter.CreatedBefore != nil {
			query += " AND created_at <= $" + string(argIndex+'0')
			args = append(args, filter.CreatedBefore)
			argIndex++
		}
	}

	rows, err := r.db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var pages []Page
	for rows.Next() {
		var page Page
		var contentJSON []byte

		err := rows.Scan(
			&page.ID, 
			&page.Title, 
			&contentJSON, 
			&page.Type, 
			&page.AuthorID, 
			&page.CreatedAt, 
			&page.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		// Unmarshal content
		page.Content = contentJSON
		pages = append(pages, page)
	}

	return pages, nil
}

func (r *PostgresPageRepository) Update(page *Page) error {
	if err := page.Validate(); err != nil {
		return err
	}

	// Update timestamps
	page.UpdatedAt = time.Now()

	// Convert content to JSON
	contentJSON, err := json.Marshal(page.Content)
	if err != nil {
		return err
	}

	query := `
		UPDATE pages 
		SET title = $1, 
			content = $2, 
			type = $3, 
			author_id = $4, 
			updated_at = $5
		WHERE id = $6
	`

	_, err = r.db.Exec(
		query, 
		page.Title, 
		contentJSON, 
		page.Type, 
		page.AuthorID, 
		page.UpdatedAt, 
		page.ID,
	)

	return err
}

func (r *PostgresPageRepository) Delete(id string) error {
	query := `DELETE FROM pages WHERE id = $1`
	_, err := r.db.Exec(query, id)
	return err
}
