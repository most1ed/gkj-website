import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { UserRole } from '@/routes/types';

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
        <FlexDashboardPage />
      </ProtectedRoute>
    )
  }
];
