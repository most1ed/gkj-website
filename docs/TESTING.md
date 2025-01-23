# Testing Guidelines

## Overview

This document outlines testing standards and practices for the GKJ Website project.

## Testing Pyramid

```
    ┌───────┐
    │  E2E  │
  ┌─┴───────┴─┐
  │Integration │
┌─┴───────────┴─┐
│    Unit Tests  │
└───────────────┘
```

## Test Types

### 1. Unit Tests

Test individual components and functions in isolation.

#### Frontend Unit Tests

```typescript
// Button.test.tsx
import { render, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    )
    fireEvent.click(getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### Backend Unit Tests

```go
// user_service_test.go
func TestUserService_GetUser(t *testing.T) {
    tests := []struct {
        name    string
        userID  string
        want    *User
        wantErr bool
    }{
        {
            name:    "valid user",
            userID:  "123",
            want:    &User{ID: "123", Name: "Test User"},
            wantErr: false,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := service.GetUser(tt.userID)
            if (err != nil) != tt.wantErr {
                t.Errorf("GetUser() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("GetUser() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

### 2. Integration Tests

Test multiple components working together.

#### Frontend Integration Tests

```typescript
// WartaForm.test.tsx
describe('WartaForm Integration', () => {
  it('submits form successfully', async () => {
    const { getByLabelText, getByText } = render(<WartaForm />)
    
    await userEvent.type(getByLabelText('Title'), 'Test Warta')
    await userEvent.type(getByLabelText('Content'), 'Test Content')
    
    fireEvent.click(getByText('Submit'))
    
    await waitFor(() => {
      expect(getByText('Success')).toBeInTheDocument()
    })
  })
})
```

#### Backend Integration Tests

```go
// api_test.go
func TestAPI_CreateWarta(t *testing.T) {
    router := setupTestRouter()
    
    payload := `{"title": "Test Warta", "content": "Test Content"}`
    
    req := httptest.NewRequest("POST", "/api/warta", strings.NewReader(payload))
    w := httptest.NewRecorder()
    
    router.ServeHTTP(w, req)
    
    assert.Equal(t, 200, w.Code)
    assert.Contains(t, w.Body.String(), "success")
}
```

### 3. E2E Tests

Test complete user flows from start to finish.

```typescript
// cypress/integration/warta.spec.ts
describe('Warta Flow', () => {
  it('creates and views warta', () => {
    cy.login('admin@example.com', 'password')
    
    cy.visit('/warta/create')
    cy.get('[data-testid="title"]').type('Test Warta')
    cy.get('[data-testid="content"]').type('Test Content')
    cy.get('[data-testid="submit"]').click()
    
    cy.url().should('include', '/warta/')
    cy.contains('Test Warta')
  })
})
```

## Test Coverage

### Coverage Goals
- Unit Tests: 80%+ coverage
- Integration Tests: 60%+ coverage
- E2E Tests: Critical paths covered

### Running Coverage Reports

Frontend:
```bash
npm run test:coverage
```

Backend:
```bash
go test -cover ./...
```

## Testing Best Practices

### 1. Naming Conventions

```typescript
describe('ComponentName', () => {
  describe('functionName', () => {
    it('should describe expected behavior', () => {
      // test
    })
  })
})
```

### 2. Test Structure (AAA)

```typescript
it('should update user profile', () => {
  // Arrange
  const user = createTestUser()
  
  // Act
  const result = updateProfile(user, { name: 'New Name' })
  
  // Assert
  expect(result.name).toBe('New Name')
})
```

### 3. Mock Data

```typescript
// mocks/user.ts
export const createTestUser = (overrides = {}) => ({
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides
})
```

### 4. API Mocking

```typescript
// api.test.ts
jest.mock('../api', () => ({
  fetchUser: jest.fn().mockResolvedValue({
    id: '123',
    name: 'Test User'
  })
}))
```

## Testing Tools

### Frontend
- Jest
- React Testing Library
- Cypress
- MSW (Mock Service Worker)

### Backend
- Go testing package
- Testify
- Mock
- HTTPTest

## CI/CD Integration

### GitHub Actions Workflow

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Run Tests
        run: npm test
        
      - name: Upload Coverage
        uses: codecov/codecov-action@v2
```

## Performance Testing

### Load Testing
```javascript
// k6.js
import http from 'k6/http'

export default function () {
  http.get('http://localhost:3000')
}

export const options = {
  vus: 10,
  duration: '30s',
}
```

### Benchmark Testing
```go
func BenchmarkHandler(b *testing.B) {
    for i := 0; i < b.N; i++ {
        handler.ServeHTTP(httptest.NewRecorder(), httptest.NewRequest("GET", "/", nil))
    }
}
```

## Security Testing

### 1. OWASP Compliance Tests
- SQL Injection
- XSS Attacks
- CSRF Protection
- Authentication Tests

### 2. Penetration Testing
- API Security
- Input Validation
- File Upload Security
- Session Management

## Accessibility Testing

### 1. Automated Tests
```typescript
// Button.test.tsx
it('meets accessibility standards', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### 2. Manual Testing
- Screen Reader Testing
- Keyboard Navigation
- Color Contrast
- Focus Management

## Test Documentation

### 1. Test Plan Template
```markdown
# Test Plan: [Feature Name]

## Objective
[Description of what we're testing]

## Test Cases
1. [Test case description]
   - Steps
   - Expected Result
   - Actual Result
   - Status

## Coverage
- Areas covered
- Areas not covered

## Dependencies
- Required setup
- Test data
```

### 2. Bug Report Template
```markdown
# Bug Report

## Description
[Bug description]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser
- OS
- Version
```
