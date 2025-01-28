import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from '@/routes/public.routes';
import LoginPage from '@/features/auth/login/LoginPage';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DummyPage } from '@/components/DummyPage';

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

  // Dashboard routes (protected)
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DummyPage title="Dashboard" />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
