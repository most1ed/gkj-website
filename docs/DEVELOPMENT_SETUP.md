# Development Setup Guide

## Prerequisites

### Required Software
1. **Node.js & npm**
   - Version: >= 18.0.0
   - Download: [https://nodejs.org/](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Go**
   - Version: >= 1.21
   - Download: [https://go.dev/dl/](https://go.dev/dl/)
   - Verify installation:
     ```bash
     go version
     ```

3. **Git**
   - Download: [https://git-scm.com/](https://git-scm.com/)
   - Verify installation:
     ```bash
     git --version
     ```

4. **Visual Studio Code** (Recommended)
   - Download: [https://code.visualstudio.com/](https://code.visualstudio.com/)

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Go
- GitLens
- Error Lens
- Pretty TypeScript Errors

## Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-org/gkj-website.git
cd gkj-website
```

### 2. Frontend Setup
```bash
# Masuk ke direktori frontend
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
# Masuk ke direktori backend
cd backend

# Install Go dependencies
go mod tidy

# Setup environment variables
cp .env.example .env

# Start development server
go run main.go
```

## Development Workflow

### Frontend Development

#### Running Development Server
```bash
cd frontend
npm run dev
```

#### Building for Production
```bash
npm run build
```

#### Running Tests
```bash
npm run test
```

#### Linting
```bash
npm run lint
```

### Backend Development

#### Running Development Server
```bash
cd backend
go run main.go
```

#### Building for Production
```bash
go build
```

#### Running Tests
```bash
go test ./...
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080
VITE_ENVIRONMENT=development
```

### Backend (.env)
```env
PORT=8080
DB_CONNECTION=postgresql://user:password@localhost:5432/gkj
REDIS_URL=redis://localhost:6379
```

## Database Setup

### PostgreSQL
1. Install PostgreSQL
2. Create database
3. Run migrations:
   ```bash
   cd backend
   go run cmd/migrate/main.go up
   ```

### Redis
1. Install Redis
2. Start Redis server
3. Verify connection

## Common Issues & Solutions

### Frontend Issues

1. **Node Modules Issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Build Errors**
   - Clear cache:
     ```bash
     npm run clean
     ```
   - Update dependencies:
     ```bash
     npm update
     ```

### Backend Issues

1. **Go Module Issues**
   ```bash
   go mod tidy
   go mod vendor
   ```

2. **Database Connection Issues**
   - Check connection string
   - Verify database is running
   - Check credentials

## Code Quality Guidelines

### Frontend
- Run linter before commits
- Follow TypeScript best practices
- Use proper component structure
- Implement proper error handling

### Backend
- Follow Go idioms
- Implement proper logging
- Handle errors appropriately
- Use proper package structure

## Deployment

### Local Production Build
1. Build frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Build backend:
   ```bash
   cd backend
   go build
   ```

### Docker Build
```bash
docker-compose up --build
```

## Monitoring & Debugging

### Frontend
- React Developer Tools
- Redux DevTools (if used)
- Browser Console
- Network Tab

### Backend
- Go debugger
- API testing tools
- Log monitoring
- Database monitoring

## Additional Resources

### Documentation
- [React Documentation](https://reactjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Go Documentation](https://golang.org/doc/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Style Guides
- [React/TypeScript Style Guide](./STYLE_GUIDE.md)
- [Go Style Guide](./GO_STYLE_GUIDE.md)

### API Documentation
- [API Guidelines](./API_GUIDELINES.md)
- [API Documentation](./API.md)
