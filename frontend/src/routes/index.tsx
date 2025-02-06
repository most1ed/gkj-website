import { 
  createBrowserRouter, 
  RouterProvider, 
  Route, 
  createRoutesFromElements 
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { 
  UserRole, 
  ExtendedRouteObject, 
  canAccessRoute 
} from './types';

// Layouts
import RootLayout from '@/layouts/RootLayout';
import PanelLayout from '@/layouts/PanelLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Lazy-loaded Pages
const HomePage = lazy(() => import('@/features/public/HomePage'));
const LoginPage = lazy(() => import('@/features/auth/login/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/register/RegisterPage'));
const DashboardPage = lazy(() => import('@/features/panel/dashboard/DashboardPage'));
const ServicesPage = lazy(() => import('@/features/services/ServicesPage'));
const MembersPage = lazy(() => import('@/features/members/MembersPage'));
const ProfilePage = lazy(() => import('@/features/profile/ProfilePage'));
const UnauthorizedPage = lazy(() => import('@/features/errors/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('@/features/errors/NotFoundPage'));

// Loading and Error Components
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ErrorBoundary, withErrorBoundary } from '@/components/ui/error-boundary';

// Authentication Hook
import { useAuth } from '@/hooks/auth';

// Protected Route Wrapper
function ProtectedRoute({ 
  children, 
  requiredRoles 
}: { 
  children: React.ReactNode, 
  requiredRoles?: UserRole[] 
}) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// Route Configurations
const publicRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <HomePage />
      }
    ]
  },
  {
    path: 'login',
    element: <AuthLayout><LoginPage /></AuthLayout>
  },
  {
    path: 'register',
    element: <AuthLayout><RegisterPage /></AuthLayout>
  }
];

const authRoutes = [];

const panelRoutes = [
  {
    path: 'panel',
    element: <PanelLayout />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MAJELIS]}>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'services',
        element: (
          <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MAJELIS]}>
            <ServicesPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'members',
        element: (
          <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MAJELIS]}>
            <MembersPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      }
    ]
  }
];

const errorRoutes = [
  {
    path: 'unauthorized',
    element: <UnauthorizedPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

// Global error fallback
const GlobalErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-destructive mb-4">
        Kesalahan Aplikasi
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Maaf, terjadi masalah yang tidak terduga.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Muat Ulang Aplikasi
      </button>
    </div>
  </div>
);

// Create router with error boundaries
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      errorElement={
        <ErrorBoundary fallback={<GlobalErrorFallback />}>
          <div>Terjadi Kesalahan</div>
        </ErrorBoundary>
      }
    >
      {/* Wrap all route groups with Suspense for code splitting */}
      <Route 
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Outlet />
          </Suspense>
        }
      >
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route 
            key={`public-${index}`} 
            path={route.path} 
            element={
              <ErrorBoundary>
                {route.element}
              </ErrorBoundary>
            } 
          />
        ))}

        {/* Authentication Routes */}
        {authRoutes.map((route, index) => (
          <Route 
            key={`auth-${index}`} 
            path={route.path} 
            element={
              <ErrorBoundary>
                {route.element}
              </ErrorBoundary>
            } 
          />
        ))}

        {/* Panel Routes */}
        {panelRoutes.map((route, index) => (
          <Route 
            key={`panel-${index}`} 
            path={route.path} 
            element={
              <ErrorBoundary>
                {route.element}
              </ErrorBoundary>
            } 
            children={route.children?.map((childRoute, childIndex) => (
              <Route 
                key={`panel-child-${childIndex}`} 
                path={childRoute.path} 
                element={
                  <ErrorBoundary>
                    {childRoute.element}
                  </ErrorBoundary>
                } 
              />
            ))}
          />
        ))}

        {/* Error Routes */}
        {errorRoutes.map((route, index) => (
          <Route 
            key={`error-${index}`} 
            path={route.path} 
            element={
              <ErrorBoundary>
                {route.element}
              </ErrorBoundary>
            } 
          />
        ))}
      </Route>
    </Route>
  )
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
