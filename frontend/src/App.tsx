import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from '@/routes/public.routes';
import { authRoutes } from '@/routes/auth.routes';
import { Toaster } from '@/components/ui/Toast/Toaster';
import { AuthProvider } from '@/providers/AuthContext';

// Only use public routes for now
const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  // panelRoutes, and protectedRoutes will be added later
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
