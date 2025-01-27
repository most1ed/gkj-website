import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from '@/routes/public.routes';
import { Toaster } from '@/components/ui/Toast/Toaster';

// Only use public routes for now
const router = createBrowserRouter([
  ...publicRoutes,
  // authRoutes, panelRoutes, and protectedRoutes will be added later
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
