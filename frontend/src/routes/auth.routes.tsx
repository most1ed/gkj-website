import { RouteObject } from "react-router-dom";

// Auth Pages
// import { LoginPage } from "@/features/auth/login/LoginPage";
// import { RegisterPage } from "@/features/auth/register/RegisterPage";
// import { ForgotPasswordPage } from "@/features/auth/forgot-password/ForgotPasswordPage";
// import { ResetPasswordPage } from "@/features/auth/reset-password/ResetPasswordPage";

// Auth Components
// import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { AuthDialog } from "@/features/public/auth/components/AuthDialog";

// Temporarily disabled auth routes
export const authRoutes: RouteObject[] = [];

/* Will be enabled later
export const authRoutes: RouteObject[] = {
  path: "auth",
  element: <AuthDialog />,
  children: [
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "forgot-password", element: <ForgotPasswordPage /> },
    { path: "reset-password", element: <ResetPasswordPage /> },
  ],
};
*/
