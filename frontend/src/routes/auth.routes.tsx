import { RouteObject } from "react-router-dom";
import { LoginPage } from "@/features/auth/login/LoginPage";
import { DummyPage } from "@/components/DummyPage";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { AdminLayout } from "@/layouts/AdminLayout";

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    children: [
      { 
        path: "login", 
        element: <LoginPage /> 
      },
      { 
        path: "register", 
        element: <DummyPage /> 
      },
      { 
        path: "forgot-password", 
        element: <DummyPage /> 
      }
    ]
  },
  {
    path: "dashboard",
    element: <AuthGuard><AdminLayout /></AuthGuard>,
    children: [
      { 
        index: true, 
        element: <DummyPage /> 
      },
      {
        path: "profile",
        element: <DummyPage />
      },
      {
        path: "documents",
        element: <DummyPage />
      },
      {
        path: "events",
        element: <DummyPage />
      },
      {
        path: "finance",
        element: <DummyPage />
      },
      {
        path: "service",
        element: <DummyPage />
      },
      {
        path: "konten",
        children: [
          {
            path: "about",
            element: <DummyPage />
          },
          {
            path: "history",
            element: <DummyPage />
          },
          {
            path: "vision-mission",
            element: <DummyPage />
          },
          {
            path: "organization",
            element: <DummyPage />
          }
        ]
      },
      {
        path: "media",
        children: [
          {
            path: "gallery",
            element: <DummyPage />
          },
          {
            path: "videos",
            element: <DummyPage />
          },
          {
            path: "sermons",
            element: <DummyPage />
          }
        ]
      },
      {
        path: "artikel",
        children: [
          {
            path: "articles",
            element: <DummyPage />
          },
          {
            path: "categories",
            element: <DummyPage />
          },
          {
            path: "tags",
            element: <DummyPage />
          }
        ]
      },
      {
        path: "alkitab",
        children: [
          {
            path: "daily-reading",
            element: <DummyPage />
          },
          {
            path: "devotional",
            element: <DummyPage />
          },
          {
            path: "settings",
            element: <DummyPage />
          }
        ]
      },
      {
        path: "master",
        children: [
          {
            path: "council",
            element: <DummyPage />
          },
          {
            path: "users",
            element: <DummyPage />
          }
        ]
      },
      {
        path: "pengaturan",
        children: [
          {
            path: "website",
            element: <DummyPage />
          },
          {
            path: "email",
            element: <DummyPage />
          },
          {
            path: "backup",
            element: <DummyPage />
          }
        ]
      }
    ]
  }
];
