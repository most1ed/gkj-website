# API Documentation

## Overview
This document outlines the REST API endpoints for the GKJ Website backend services.

## Base URL
```
Development: http://localhost:8080/api/v1
Production: https://api.gkj-website.com/api/v1
```

## Authentication
All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /auth/login
Login with email and password.

**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Warta (Church Bulletin)

#### GET /warta
Get list of church bulletins.

**Query Parameters:**
- page (optional): number
- limit (optional): number
- search (optional): string

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "date": "string",
      "content": "string",
      "pdfUrl": "string"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

#### POST /warta
Create new church bulletin.

**Request:**
```json
{
  "title": "string",
  "date": "string",
  "content": "string",
  "attachments": "array"
}
```

### News & Announcements

#### GET /news
Get list of news articles.

**Query Parameters:**
- page (optional): number
- limit (optional): number
- category (optional): string

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "category": "string",
      "publishDate": "string"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

### Offerings

#### POST /offerings
Record new offering.

**Request:**
```json
{
  "amount": "number",
  "category": "string",
  "date": "string",
  "notes": "string"
}
```

#### GET /offerings/report
Get offerings report.

**Query Parameters:**
- startDate: string
- endDate: string
- category (optional): string

**Response:**
```json
{
  "total": "number",
  "breakdown": [
    {
      "category": "string",
      "amount": "number"
    }
  ]
}
```

### Media

#### POST /media/upload
Upload media file.

**Request:**
- Multipart form data with file

**Response:**
```json
{
  "id": "string",
  "url": "string",
  "type": "string",
  "size": "number"
}
```

## Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

### Common Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Internal Server Error

## Rate Limiting
- Rate limit: 100 requests per minute
- Rate limit header: X-RateLimit-Limit
- Remaining requests header: X-RateLimit-Remaining

## Versioning
API versioning is handled through the URL path (/api/v1/).

## Security
1. All endpoints use HTTPS
2. Authentication uses JWT tokens
3. File uploads are validated
4. Input is sanitized
5. CORS is properly configured

## Testing
Test endpoints using provided Postman collection:
```
/docs/postman/GKJ-API.postman_collection.json
```
