# Base Workflow & Initial Knowledge

## 1. Struktur Dokumentasi Utama

### Core Documentation
1. **[WINSURF_RULES.md](./WINSURF_RULES.md)**
   - Panduan utama pengembangan
   - Coding standards
   - Best practices
   - Workflow standards

2. **[TECH_STACK.md](./TECH_STACK.md)**
   - Detail teknologi yang digunakan
   - Versi library dan dependencies
   - Infrastructure setup
   - Security & performance

3. **[DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)**
   - Panduan setup environment
   - Development workflow
   - Troubleshooting
   - Deployment guide

## 2. Struktur Aplikasi

### Frontend (React + TypeScript)
```
frontend/
├── src/
│   ├── components/     # Reusable components
│   │   ├── ui/        # Base UI components
│   │   ├── layout/    # Layout components
│   │   └── feature/   # Feature components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilities
│   ├── types/         # TypeScript types
│   └── styles/        # Global styles
```

### Backend (Go)
```
backend/
├── cmd/              # Entry points
├── internal/         # Private packages
├── pkg/             # Public packages
└── migrations/      # Database migrations
```

## 3. Core Technologies

### Frontend
- React 18
- TypeScript
- TailwindCSS
- HeadlessUI & RadixUI
- React Router
- PDF Generation (React PDF + jsPDF)

### Backend
- Go 1.21
- Fiber Framework
- PostgreSQL
- Redis

## 4. Development Workflow

### 1. Initial Setup
```bash
# Clone repository
git clone [repository-url]

# Frontend setup
cd frontend
npm install
cp .env.example .env
npm run dev

# Backend setup
cd backend
go mod tidy
cp .env.example .env
go run main.go
```

### 2. Development Cycle
1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/nama-fitur
   ```

3. **Development**
   - Frontend: `npm run dev`
   - Backend: `go run main.go`
   - Follow coding standards
   - Implement tests

4. **Code Review**
   - Self-review changes
   - Run linting
   - Run tests
   - Create pull request

### 3. Component Development
1. **Create new component**
   ```tsx
   // components/ui/Button.tsx
   import { cn } from "@/lib/utils"
   
   interface ButtonProps {
     variant?: "default" | "outline"
     // ...props
   }
   
   export function Button({ variant = "default", ...props }: ButtonProps) {
     return (
       <button
         className={cn(
           "base-styles",
           variant === "outline" && "outline-styles"
         )}
         {...props}
       />
     )
   }
   ```

2. **Use component**
   ```tsx
   import { Button } from "@/components/ui/button"
   
   export function MyComponent() {
     return (
       <Button variant="outline">
         Click Me
       </Button>
     )
   }
   ```

## 5. Key Workflows

### 1. Styling dengan TailwindCSS
```tsx
// Gunakan utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-bold text-gray-800">Title</h2>
</div>

// Gunakan class merging
import { cn } from "@/lib/utils"

<div className={cn(
  "base-styles",
  condition && "conditional-styles",
  className
)}>
```

### 2. Error Handling
```tsx
// Gunakan Error Boundary
<ErrorBoundary fallback={<ErrorComponent />}>
  <MyComponent />
</ErrorBoundary>

// Handle API errors
try {
  const data = await apiCall()
} catch (error) {
  handleError(error)
}
```

### 3. State Management
```tsx
// Local state
const [state, setState] = useState(initial)

// Context untuk global state
const MyContext = createContext(null)
export function MyProvider({ children }) {
  // state logic
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
```

### 4. PDF Generation
```tsx
// Menggunakan React PDF
import { Document, Page, Text } from '@react-pdf/renderer'

// Atau jsPDF
import jsPDF from 'jspdf'
```

## 6. Testing Workflow

### 1. Unit Testing
```tsx
// Component testing
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click</Button>)
    expect(screen.getByText('Click')).toBeInTheDocument()
  })
})
```

### 2. Integration Testing
```tsx
// Feature testing
test('user can submit form', async () => {
  render(<Form />)
  // test implementation
})
```

## 7. Deployment Workflow

### 1. Build
```bash
# Frontend
npm run build

# Backend
go build
```

### 2. Deployment Checks
- Run all tests
- Check build size
- Verify environment variables
- Check dependencies

## 8. Common Patterns

### 1. Component Pattern
```tsx
// Compound Components
const Card = ({ children }) => <div>{children}</div>
Card.Header = ({ children }) => <header>{children}</header>
Card.Body = ({ children }) => <main>{children}</main>
Card.Footer = ({ children }) => <footer>{children}</footer>
```

### 2. Hook Pattern
```tsx
// Custom Hook
function useAuth() {
  const [user, setUser] = useState(null)
  
  const login = async (credentials) => {
    // implementation
  }
  
  return { user, login }
}
```

### 3. Service Pattern
```typescript
// API Service
class AuthService {
  static async login(credentials) {
    // implementation
  }
  
  static async logout() {
    // implementation
  }
}
```

## 9. Monitoring & Debug

### 1. Frontend Debugging
- React Developer Tools
- Console logging
- Network tab monitoring

### 2. Backend Debugging
- Go debugger
- Log monitoring
- Database monitoring

## 10. Security Checklist

### 1. Frontend
- Input validation
- XSS prevention
- Secure data handling

### 2. Backend
- Authentication
- Authorization
- Data validation
- CORS configuration

## 11. Performance Optimization

### 1. Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle optimization

### 2. Backend
- Caching
- Query optimization
- Connection pooling
- Load balancing

## 12. Maintenance

### 1. Regular Tasks
- Dependency updates
- Security patches
- Performance monitoring
- Error tracking

### 2. Documentation
- Keep docs updated
- Document changes
- Update changelogs
- Maintain API docs
