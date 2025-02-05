import React, { Suspense, startTransition } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider, useNavigate, useNavigation } from 'react-router-dom';
import { publicRoutes } from '@/routes/public.routes';
import { panelRoutes } from '@/routes/panel.routes';
import LoginPage from '@/features/auth/login/LoginPage';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/common/theme/ThemeProvider';
import { AuthProvider } from '@/providers/auth-provider';

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
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
