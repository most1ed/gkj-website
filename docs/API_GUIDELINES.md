# API Design Guidelines

## General Principles

### 1. RESTful Design
- Use proper HTTP methods
- Follow resource-oriented design
- Maintain statelessness
- Support caching

### 2. URL Structure
```
/api/v1/resource-name
/api/v1/resource-name/:id
/api/v1/resource-name/:id/sub-resource
```

Example:
```
GET    /api/v1/warta           # List wartas
POST   /api/v1/warta           # Create warta
GET    /api/v1/warta/:id       # Get warta
PUT    /api/v1/warta/:id       # Update warta
DELETE /api/v1/warta/:id       # Delete warta
```

## Request/Response Format

### 1. Request Format

#### Headers
```http
Content-Type: application/json
Authorization: Bearer <token>
Accept-Language: id-ID
```

#### Query Parameters
```
?page=1&limit=10&sort=created_at&order=desc
```

#### Request Body
```json
{
  "title": "string",
  "content": "string",
  "metadata": {
    "author": "string",
    "tags": ["string"]
  }
}
```

### 2. Response Format

#### Success Response
```json
{
  "status": "success",
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "created_at": "string",
    "updated_at": "string"
  },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

#### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ]
  }
}
```

## HTTP Status Codes

### Success Codes
- 200: OK (GET, PUT, DELETE)
- 201: Created (POST)
- 204: No Content (DELETE)

### Client Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Unprocessable Entity

### Server Error Codes
- 500: Internal Server Error
- 502: Bad Gateway
- 503: Service Unavailable

## Authentication

### 1. JWT Authentication
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### 2. OAuth2 Flow
```
┌─────────┐     ┌─────────┐     ┌─────────┐
│  Client │────►│  Auth   │────►│Resource │
│         │     │ Server  │     │ Server  │
└─────────┘     └─────────┘     └─────────┘
```

## Versioning

### 1. URL Versioning
```
/api/v1/resource
/api/v2/resource
```

### 2. Version Headers
```http
Accept: application/vnd.gkj.v1+json
```

## Rate Limiting

### 1. Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

### 2. Response (429 Too Many Requests)
```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retry_after": 3600
  }
}
```

## Pagination

### 1. Request
```
GET /api/v1/warta?page=2&limit=10
```

### 2. Response
```json
{
  "status": "success",
  "data": [...],
  "meta": {
    "page": 2,
    "limit": 10,
    "total": 100,
    "total_pages": 10
  },
  "links": {
    "first": "/api/v1/warta?page=1",
    "prev": "/api/v1/warta?page=1",
    "next": "/api/v1/warta?page=3",
    "last": "/api/v1/warta?page=10"
  }
}
```

## Filtering

### 1. Simple Filters
```
GET /api/v1/warta?status=published&category=umum
```

### 2. Advanced Filters
```
GET /api/v1/warta?date_range=2024-01-01,2024-12-31&tags=in:penting,umum
```

## Sorting

### 1. Single Field
```
GET /api/v1/warta?sort=created_at&order=desc
```

### 2. Multiple Fields
```
GET /api/v1/warta?sort=status,created_at&order=asc,desc
```

## Field Selection

### 1. Include Fields
```
GET /api/v1/warta?fields=id,title,content
```

### 2. Expand Relations
```
GET /api/v1/warta?expand=author,comments
```

## Caching

### 1. Cache Headers
```http
Cache-Control: public, max-age=3600
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

### 2. Conditional Requests
```http
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

## CORS

### 1. Headers
```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

## API Documentation

### 1. OpenAPI Specification
```yaml
openapi: 3.0.0
info:
  title: GKJ Website API
  version: 1.0.0
paths:
  /warta:
    get:
      summary: List wartas
      parameters:
        - name: page
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: Success
```

### 2. API Documentation Example
```markdown
## Get Warta

Retrieves a warta by ID.

GET /api/v1/warta/:id

### Parameters
- id: string (required) - The warta ID

### Response
```json
{
  "status": "success",
  "data": {
    "id": "123",
    "title": "Warta Minggu",
    "content": "..."
  }
}
```

## Error Handling

### 1. Error Types
```typescript
enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}
```

### 2. Error Response Structure
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...],
    "trace_id": "abc123"
  }
}
```

## Security

### 1. Input Validation
```go
type WartaInput struct {
    Title   string `json:"title" validate:"required,min=3,max=255"`
    Content string `json:"content" validate:"required"`
}
```

### 2. Output Sanitization
```go
func sanitizeOutput(data interface{}) interface{} {
    // Implementation
}
```

## Performance

### 1. Response Compression
```http
Content-Encoding: gzip
```

### 2. Batch Operations
```
POST /api/v1/batch
{
  "operations": [
    { "method": "GET", "path": "/warta/1" },
    { "method": "GET", "path": "/warta/2" }
  ]
}
```
