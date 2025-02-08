CREATE TABLE pages (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content JSONB NOT NULL,
    type VARCHAR(50) DEFAULT 'DRAFT',
    author_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pages_type ON pages(type);
CREATE INDEX idx_pages_author ON pages(author_id);
CREATE INDEX idx_pages_created_at ON pages(created_at);
