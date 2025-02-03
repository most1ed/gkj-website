import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const protectedRoute = (Component: React.ComponentType) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProtectedRouteWrapper>
        <Component />
      </ProtectedRouteWrapper>
    </Suspense>
  );
};

const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};
