import { RouteObject } from "react-router-dom";
import { LoginPage } from "@/features/auth/login/LoginPage";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminDashboard } from "@/features/panel/admin/DashboardPage";
import { AuthDialog } from "@/features/public/auth/components/AuthDialog";

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    children: [
      { path: "login", element: <LoginPage /> }
    ]
  },
  {
    path: "dashboard",
    element: <AuthGuard><AdminLayout /></AuthGuard>,
    children: [
      { 
        index: true, 
        element: <AdminDashboard /> 
      }
    ]
  }
];
