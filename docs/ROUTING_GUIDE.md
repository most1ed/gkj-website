# 🚦 GKJ Website Routing & Navigation Guide

## 📍 Routing Architecture Overview

### 🏗️ Core Routing Principles
- **Type-Safe Routing**: Fully typed with TypeScript
- **Code Splitting**: Lazy loading of route components
- **Role-Based Access Control**: Secure route navigation
- **Performance Optimized**: Minimal bundle size
- **Centralized Route Management**

## 🗺️ Route Types

### 1. Public Routes
- Accessible without authentication
- Located in: `src/routes/public.routes.tsx`
- Examples:
  - Landing Page
  - Login
  - Registration
  - Public Information Pages

### 2. Authentication Routes
- Located in: `src/routes/auth.routes.tsx`
- Handles authentication-related navigation
- Includes:
  - Login
  - Logout
  - Password Reset
  - Registration

### 3. Panel Routes
- Requires authentication
- Located in: `src/routes/panel.routes.tsx`
- Role-based access
- Includes:
  - Dashboard
  - User Management
  - Service Management
  - Reporting

## 🔒 Access Control Strategy

### Role-Based Navigation
- **Administrator**: Full system access
- **Majelis**: Service and member management
- **Warga**: Limited information access
- **Guest**: Minimal public access

### Authentication Flow
1. User attempts to access protected route
2. Check authentication status
3. Validate user role
4. Redirect if unauthorized
   - Unauthenticated: `/login`
   - Unauthorized: `/unauthorized`

## 💻 Technical Implementation

### Route Configuration
```typescript
// Example route configuration
export const panelRoutes: RouteObject[] = [
  {
    path: 'panel',
    element: <PanelLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute roles={['ADMIN', 'MAJELIS']}>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'services',
        element: (
          <ProtectedRoute roles={['ADMIN', 'MAJELIS']}>
            <ServicesPage />
          </ProtectedRoute>
        )
      }
    ]
  }
]
```

### Lazy Loading Routes
```typescript
const DashboardPage = lazy(() => 
  import('@/features/dashboard/DashboardPage')
);

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Lazily loaded routes */}
      </Routes>
    </Suspense>
  );
}
```

### Protected Route Component
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

function ProtectedRoute({ 
  children, 
  roles = [] 
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const { permissions } = useRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
```

## 🔍 Navigation Utilities

### Custom Navigation Hooks
```typescript
// Advanced navigation with role checks
function useRestrictedNavigation() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navigateTo = useCallback((path: string, requiredRoles?: UserRole[]) => {
    if (requiredRoles && !requiredRoles.includes(user.role)) {
      navigate('/unauthorized');
      return;
    }
    navigate(path);
  }, [navigate, user]);

  return { navigateTo };
}
```

## 🚧 Error Handling

### Navigation Error Boundaries
- Catch navigation-related errors
- Provide user-friendly error pages
- Log errors for monitoring

## 📊 Performance Considerations
- Minimal route bundle sizes
- Efficient code splitting
- Preloading critical routes
- Minimal re-renders during navigation

## 🔮 Future Improvements
- Dynamic route generation
- More granular permission system
- Enhanced analytics for navigation
- Improved error tracking

## 📝 Best Practices
1. Keep routes declarative and type-safe
2. Use lazy loading for all routes
3. Implement comprehensive access control
4. Minimize complex routing logic
5. Provide clear user feedback during navigation

## 🆘 Troubleshooting
- Check authentication state
- Verify role permissions
- Review route configuration
- Inspect network requests
- Use browser developer tools

## 📞 Support
Contact frontend development team for routing-related issues.
