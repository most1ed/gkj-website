# Frontend Architecture Documentation (Updated)

## Project Overview
- **Version**: 1.1.0
- **Last Updated**: 2025-02-07

## Technology Stack
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand, React Query
- **Routing**: React Router v6

## Architectural Principles
1. **Modularity**: Highly reusable, composable components
2. **Feature-Based Structure**: Organized by domain and functionality
3. **Type Safety**: Strict TypeScript configuration
4. **Separation of Concerns**: Clear component and feature boundaries

## Project Structure

### Root Directory Layout
```
/frontend
├── src/
│   ├── components/       # Centralized, reusable UI components
│   │   ├── ui/           # Primitive and atomic components
│   │   └── common/       # Shared, complex components
│   ├── features/         # Domain-specific feature modules
│   │   ├── public/       # Public-facing features
│   │   ├── auth/         # Authentication-related features
│   │   ├── panel/        # User panel features
│   │   └── dashboard/    # Dashboard-specific features
│   ├── layouts/          # Page and section layouts
│   ├── routes/           # Application routing
│   ├── lib/              # Shared libraries
│   └── utils/            # Utility functions
├── public/
├── node_modules/
├── package.json
└── vite.config.ts
```

## Routing Strategy

### Route Types
1. **Public Routes** (`public.routes.tsx`)
   - Accessible without authentication
   - Includes landing page, public information

2. **Authentication Routes** (`auth.routes.tsx`)
   - Login, registration, password reset
   - Authentication flow management

3. **Panel Routes** (`panel.routes.tsx`)
   - Authenticated user routes
   - Role-based access control
   - Feature-specific dashboards

### Key Routing Principles
- Lazy loading of route components
- Type-safe routing
- Centralized route management
- Performance-optimized navigation

## Component Architecture

### UI Components (`/components`)
- **Primitive Components**: Basic building blocks
  - Button, Input, Select, etc.
- **Complex Components**: Advanced, reusable UI elements
  - DataTable, Dialog, Tabs
- **Specialized Components**: Domain-specific UI
  - Avatar, Calendar, FileUpload

### Feature Components (`/features`)
- Organized by domain and functionality
- Each feature contains:
  - Components
  - Hooks
  - Page-level components
  - State management
  - Utility functions

## State Management
- **Zustand**: Global state management
- **React Query**: Server state synchronization
- **Jotai**: Atomic state primitives

## Performance Optimization
- Code splitting
- Lazy loading
- Memoization techniques
- Efficient state management

## Development Guidelines
- Follow atomic design principles
- Maintain high modularity
- Implement comprehensive typing
- Write self-documenting code
- Prioritize code reusability

## Future Improvements
- Enhanced modularization
- More granular feature components
- Advanced performance monitoring
- Comprehensive testing strategy

## Contribution
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
- Maintain coding standards
- Document significant changes
