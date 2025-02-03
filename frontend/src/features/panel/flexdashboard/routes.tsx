import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { FlexdashboardProvider } from './context/FlexdashboardProvider';

const FlexdashboardPage = lazy(() => import('./pages/FlexdashboardPage'));

export const flexdashboardRoutes: RouteObject[] = [
  {
    path: 'flexdashboard',
    element: (
      <FlexdashboardProvider>
        <FlexdashboardPage />
      </FlexdashboardProvider>
    )
  }
];
