import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from '@/features/auth/login/LoginPage';
import { DummyPage } from '@/components/DummyPage';
import { DashboardLayout } from '@/layouts/DashboardLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DummyPage title="Dashboard" />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
