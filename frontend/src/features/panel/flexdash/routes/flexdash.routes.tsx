import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { UserRole } from '@/routes/types';
import { FlexDashboardErrorBoundary } from '../components/FlexDashboardErrorBoundary';

const FlexDashboardPage = lazy(() => import('../pages/FlexDashboardPage'));

export const flexDashRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute 
        allowedRoles={[
          UserRole.ADMIN, 
          UserRole.STAFF, 
          UserRole.TREASURER
        ]}
      >
        <FlexDashboardErrorBoundary>
          <FlexDashboardPage />
        </FlexDashboardErrorBoundary>
      </ProtectedRoute>
    ),
    errorElement: (
      <FlexDashboardErrorBoundary 
        fallbackRender={(error) => (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-destructive">
                Dashboard Navigation Error
              </h1>
              <p className="mt-4">{error.message}</p>
            </div>
          </div>
        )}
      />
    )
  }
];
