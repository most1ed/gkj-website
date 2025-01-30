import { RouteObject } from 'react-router-dom';
import { PanelLayout } from '@/layouts/PanelLayout';
import { DummyPage } from '@/components/DummyPage';

export const panelRoutes: RouteObject[] = [
  {
    path: "panel",
    element: <PanelLayout />,
    children: [
      // Dashboard
      { 
        path: "dashboard", 
        element: <DummyPage title="Dashboard" /> 
      },

      // Base User Routes
      { 
        path: "profile", 
        element: <DummyPage title="Profile" /> 
      },
      { 
        path: "documents", 
        element: <DummyPage title="Documents" /> 
      },
      { 
        path: "events", 
        element: <DummyPage title="Events" /> 
      },
      { 
        path: "offerings", 
        element: <DummyPage title="Offerings" /> 
      },

      // Management Routes
      { 
        path: "jemaat", 
        element: <DummyPage title="Jemaat" /> 
      },
      { 
        path: "ibadah", 
        element: <DummyPage title="Ibadah" /> 
      },
      { 
        path: "pelayanan", 
        element: <DummyPage title="Pelayanan" /> 
      },
      { 
        path: "keuangan", 
        element: <DummyPage title="Keuangan" /> 
      },

      // Admin Routes
      { 
        path: "admin/dashboard", 
        element: <DummyPage title="Admin Dashboard" /> 
      },
      { 
        path: "admin/konten", 
        element: <DummyPage title="Konten" /> 
      },
      { 
        path: "admin/pengaturan", 
        element: <DummyPage title="Pengaturan" /> 
      },
      { 
        path: "admin/artikel", 
        element: <DummyPage title="Artikel" /> 
      },
      { 
        path: "admin/master", 
        element: <DummyPage title="Master" /> 
      },
      { 
        path: "admin/alkitab", 
        element: <DummyPage title="Alkitab" /> 
      },
      { 
        path: "admin/media", 
        element: <DummyPage title="Media" /> 
      },

      // Default Route
      { 
        index: true, 
        element: <DummyPage title="Dashboard" /> 
      }
    ]
  }
];
