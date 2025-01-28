import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from '@/routes/public.routes';
import { panelRoutes } from '@/routes/panel.routes';
import LoginPage from '@/features/auth/login/LoginPage';

// Konfigurasi router dengan public routes sebagai default
const router = createBrowserRouter([
  // Public routes (homepage dan halaman publik lainnya)
  ...publicRoutes,

  // Auth routes
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <LoginPage />
      }
    ]
  },

  // Panel routes (protected)
  ...panelRoutes
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
