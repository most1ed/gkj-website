import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { PanelLayout } from '@/layouts/PanelLayout';
import { 
  AdminDashboard,
  AlkitabPage,
  ArtikelPage,
  KontenPage,
  MediaPage,
  MasterPage,
  PengaturanPage 
} from '@/features/panel/admin';
import {
  DashboardPage as BaseDashboard,
  UserDocumentsPage,
  UserEventsPage,
  UserOfferingsPage,
  UserProfilePage
} from '@/features/panel/base';
import {
  IbadahPage,
  JemaatPage,
  KeuanganPage,
  PelayananPage
} from '@/features/panel/management';
import { DummyPage } from '@/components/DummyPage';

export const panelRoutes: RouteObject[] = [
  {
    path: "panel",
    element: <PanelLayout />,
    children: [
      // Dashboard - Base User
      {
        index: true,
        element: <DummyPage title="Base Dashboard" />
      },
      // Dashboard - Admin
      {
        path: "admin",
        children: [
          {
            index: true,
            element: <DummyPage title="Admin Dashboard" />
          },
          {
            path: "konten",
            element: <DummyPage title="Admin Konten" />
          },
          {
            path: "artikel",
            element: <DummyPage title="Admin Artikel" />
          },
          {
            path: "media",
            element: <DummyPage title="Admin Media" />
          },
          {
            path: "alkitab",
            element: <DummyPage title="Admin Alkitab" />
          },
          {
            path: "master",
            element: <DummyPage title="Admin Master" />
          },
          {
            path: "pengaturan",
            element: <DummyPage title="Admin Pengaturan" />
          }
        ]
      },

      // Profil & Layanan
      {
        path: "profile",
        children: [
          {
            index: true,
            element: <DummyPage title="User Profile" />
          },
          {
            path: "personal",
            element: <DummyPage title="Personal Profile" />
          },
          {
            path: "family",
            element: <DummyPage title="Family Profile" />
          },
          {
            path: "documents",
            element: <DummyPage title="User Documents" />
          },
          {
            path: "offerings",
            element: <DummyPage title="User Offerings" />
          }
        ]
      },

      // Sekretariat
      {
        path: "sekretariat",
        children: [
          {
            index: true,
            element: <DummyPage title="Sekretariat" />
          },
          {
            path: "jemaat",
            element: <DummyPage title="Jemaat" />
          },
          {
            path: "keluarga",
            element: <DummyPage title="Keluarga" />
          },
          {
            path: "mutasi",
            element: <DummyPage title="Mutasi" />
          },
          {
            path: "sakramen",
            element: <DummyPage title="Sakramen" />
          }
        ]
      },

      // Manajemen
      {
        path: "management",
        children: [
          {
            path: "keuangan",
            element: <DummyPage title="Keuangan" />
          },
          {
            path: "pelayanan",
            element: <DummyPage title="Pelayanan" />
          },
          {
            path: "ibadah",
            element: <DummyPage title="Ibadah" />
          }
        ]
      },

      // Events
      {
        path: "events",
        element: <DummyPage title="Events" />
      },

      // Fallback
      {
        path: "*",
        element: <DummyPage title="Page Not Found" />
      }
    ]
  }
];
