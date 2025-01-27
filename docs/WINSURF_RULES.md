# WINSURF RULES - GKJ Website

## 1. Struktur Kode dan Organisasi

### Frontend (React + TypeScript)
- Gunakan TypeScript untuk semua file baru
- Komponen React menggunakan format `.tsx`
- Utilitas dan helpers menggunakan format `.ts`
- Setiap komponen harus memiliki interface props yang jelas
- Gunakan lazy loading untuk optimasi performa

### Dependencies dan Library
#### Core Libraries
- React 18 dengan TypeScript
- Vite sebagai build tool
- React Router v6 untuk routing
- React Helmet Async untuk meta tags

#### UI Libraries
- TailwindCSS untuk styling
- HeadlessUI & RadixUI untuk accessible components
- Framer Motion untuk animasi
- Heroicons & Lucide React untuk icons
- Class Variance Authority untuk variant management

#### PDF Generation
- React PDF Renderer
- jsPDF dengan AutoTable

#### Development Tools
- ESLint untuk linting
- TypeScript untuk type checking
- PostCSS & Autoprefixer

### Backend (Go)
#### Core Libraries
- Go Fiber v2 untuk web framework
- Godotenv untuk environment variables

### Penamaan
- Komponen: PascalCase (contoh: `ErrorBoundary.tsx`)
- File utilitas: camelCase (contoh: `utils.ts`)
- Interface: Prefix 'I' (contoh: `IUserProps`)
- Type: Prefix 'T' (contoh: `TApiResponse`)
- Konstanta: UPPERCASE_WITH_UNDERSCORE

### Struktur Folder
```
frontend/src/
├── components/          # Komponen reusable
│   ├── ui/             # Komponen dasar UI
│   ├── layout/         # Komponen layout
│   └── feature/        # Komponen fitur spesifik
├── pages/              # Komponen halaman
├── hooks/              # Custom hooks
├── lib/               # Utilitas dan helpers
├── types/             # Type definitions
└── styles/            # Style global

backend/
├── cmd/               # Entry points
├── internal/          # Private packages
├── pkg/              # Public packages
└── migrations/       # Database migrations
```

## 2. Coding Style

### TypeScript/JavaScript
- Gunakan ES6+ features
- Hindari `any` type
- Gunakan async/await untuk operasi asynchronous
- Gunakan optional chaining (?.) dan nullish coalescing (??)
- Gunakan destructuring untuk props
- Gunakan type inference ketika jelas
- Explicit return types untuk functions

### React
- Gunakan Functional Components
- Gunakan React Hooks
- Implementasikan Error Boundaries
- Gunakan React.memo untuk optimasi
- Pisahkan logic dan UI
- Gunakan lazy loading untuk code splitting
- Implement proper prop types

### Go
- Ikuti Go standard layout
- Gunakan Go modules
- Implement proper error handling
- Use interfaces appropriately
- Follow Go idioms and conventions

### CSS/Styling
- Utamakan TailwindCSS
- Gunakan CSS Modules jika diperlukan
- Ikuti mobile-first approach
- Gunakan variabel untuk warna dan spacing
- Manfaatkan Tailwind plugins
- Gunakan class-variance-authority untuk variants

## 3. State Management
- Gunakan React Context untuk state global
- Gunakan local state untuk UI state
- Implementasikan custom hooks untuk logic reusable
- Cache API responses menggunakan React Query
- Implement proper loading states
- Handle error states consistently

## 4. Error Handling
- Implementasi Error Boundary di level yang tepat
- Log error ke service monitoring
- Tampilkan pesan error yang user-friendly
- Handle network errors dengan graceful degradation
- Implement retry mechanisms
- Proper error types dan messages

## 5. Performance
- Implementasi code splitting
- Optimize images dan assets
- Minimize bundle size
- Implement caching strategy
- Use memo dan useMemo dengan bijak
- Lazy load components
- Implement proper Suspense boundaries

## 6. Testing
- Unit test untuk utils dan hooks
- Integration test untuk komponen kompleks
- E2E test untuk critical paths
- Snapshot testing untuk UI components
- Test error scenarios
- Mock external dependencies

## 7. Security
- Validate semua input user
- Sanitize output
- Implement proper CORS
- Secure authentication handling
- XSS prevention
- CSRF protection
- Input validation
- Output encoding

## 8. API Integration
- Gunakan service layer untuk API calls
- Implement proper error handling
- Use proper typing untuk responses
- Handle loading dan error states
- Implement retry logic
- Cache responses appropriately
- Handle token refresh

## 9. Accessibility
- Gunakan semantic HTML
- Implement proper ARIA labels
- Ensure keyboard navigation
- Support screen readers
- Color contrast compliance
- Focus management
- Skip links

## 10. Documentation
- JSDoc untuk functions dan components
- README untuk setiap folder utama
- Update CHANGELOG.md
- Document known issues
- Maintain API documentation
- Component storybook
- Type documentation

## 11. Git Workflow
- Descriptive commit messages
- Branch naming: feature/, bugfix/, hotfix/
- Pull request template
- Code review checklist
- Keep commits atomic
- Proper version tagging
- Changelog updates

## 12. Build dan Deployment
- Optimize build configuration
- Environment-specific settings
- Proper error logging
- Performance monitoring
- Automated deployment checks
- Build size monitoring
- Cache management

## 13. Monitoring
- Implement error tracking
- Performance monitoring
- User analytics
- Server health checks
- API monitoring
- Resource usage tracking
- User behavior analytics

## 14. Mobile Responsiveness
- Mobile-first approach
- Test pada berbagai device
- Responsive images
- Touch-friendly UI
- Optimize for different screen sizes
- Handle orientation changes
- Consider network conditions

## 15. PDF Generation
- Use proper PDF libraries
- Handle large documents
- Implement proper styling
- Consider print layouts
- Handle different paper sizes
- Manage fonts properly
- Optimize PDF size

## 16. Internationalization
- Use proper i18n setup
- Handle different date formats
- Consider RTL languages
- Currency formatting
- Number formatting
- Translation management
- Locale switching
