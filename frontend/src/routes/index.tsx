import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate 
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
import ErrorBoundary from '@/components/errors/ErrorBoundary';

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
const routes: ExtendedRouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'login',
        element: <AuthLayout><LoginPage /></AuthLayout>
      },
      {
        path: 'register',
        element: <AuthLayout><RegisterPage /></AuthLayout>
      },
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
      },
      {
        path: 'unauthorized',
        element: <UnauthorizedPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
];

// Create Browser Router
const router = createBrowserRouter(
  routes.map(route => ({
    ...route,
    element: (
      <ErrorBoundary fallback={<NotFoundPage />}>
        <Suspense fallback={<div>Loading...</div>}>
          {route.element}
        </Suspense>
      </ErrorBoundary>
    )
  }))
);

// Router Provider Component
const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export { 
  AppRouter, 
  routes, 
  router, 
  ProtectedRoute 
};
