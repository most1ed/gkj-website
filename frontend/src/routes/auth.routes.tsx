import { RouteObject } from "react-router-dom";
import { LoginPage } from "@/features/auth/login/LoginPage";
import { RegisterPage } from "@/features/auth/register/RegisterPage";
import { ForgotPasswordPage } from "@/features/auth/forgot-password/ForgotPasswordPage";
import { ResetPasswordPage } from "@/features/auth/reset-password/ResetPasswordPage";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardHomePage } from "@/features/dashboard/home/DashboardHomePage";
import { UserManagementPage } from "@/features/dashboard/users/UserManagementPage";
import { ChurchActivitiesPage } from "@/features/dashboard/activities/ChurchActivitiesPage";
import { FinancialReportPage } from "@/features/dashboard/finance/FinancialReportPage";
import { AuthDialog } from "@/features/public/auth/components/AuthDialog";

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    element: <AuthDialog />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
    ]
  },
  {
    path: "dashboard",
    element: <AuthGuard><DashboardLayout /></AuthGuard>,
    children: [
      { 
        index: true, 
        element: <DashboardHomePage /> 
      },
      { 
        path: "users", 
        element: <UserManagementPage /> 
      },
      { 
        path: "activities", 
        element: <ChurchActivitiesPage /> 
      },
      { 
        path: "finance", 
        element: <FinancialReportPage /> 
      }
    ]
  }
];
