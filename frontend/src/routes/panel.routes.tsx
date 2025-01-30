<<<<<<< HEAD
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
=======
import { RouteObject } from "react-router-dom";
import { PanelLayout } from "@/layouts/PanelLayout";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { ROLES } from "@/features/auth/constants/roles";

// Base User Pages
import { UserDashboardPage } from "@/features/panel/base/dashboard/DashboardPage";
import { UserProfilePage } from "@/features/panel/base/profile/ProfilePage";
import { UserDocumentsPage } from "@/features/panel/base/documents/DocumentsPage";
import { UserEventsPage } from "@/features/panel/base/events/EventsPage";
import { UserOfferingsPage } from "@/features/panel/base/offerings/OfferingsPage";
import { UserFamilyPage } from "@/features/panel/base/family/FamilyPage";

// Sekretariat Pages
import { JemaatDataPage } from "@/features/panel/management/jemaat/JemaatDataPage";
import { JemaatFamilyPage } from "@/features/panel/management/jemaat/JemaatFamilyPage";
import { JemaatMutationPage } from "@/features/panel/management/jemaat/JemaatMutationPage";
import { JemaatSacramentPage } from "@/features/panel/management/jemaat/JemaatSacramentPage";

// Ibadah & Pelayanan Pages
import { IbadahSchedulePage } from "@/features/panel/management/ibadah/IbadahSchedulePage";
import { IbadahAttendancePage } from "@/features/panel/management/ibadah/IbadahAttendancePage";
import { PelayananTeamsPage } from "@/features/panel/management/pelayanan/PelayananTeamsPage";
import { PelayananSchedulePage } from "@/features/panel/management/pelayanan/PelayananSchedulePage";

// Keuangan Pages
import { KeuanganOfferingsPage } from "@/features/panel/management/keuangan/KeuanganOfferingsPage";
import { KeuanganCashPage } from "@/features/panel/management/keuangan/KeuanganCashPage";
import { KeuanganWeeklyPage } from "@/features/panel/management/keuangan/KeuanganWeeklyPage";
import { KeuanganMonthlyPage } from "@/features/panel/management/keuangan/KeuanganMonthlyPage";

// Admin Content Pages
import { AdminDashboardPage } from "@/features/panel/admin/DashboardPage";
import { ArtikelPage } from "@/features/panel/admin/artikel/ArtikelPage";
import { MediaPage } from "@/features/panel/admin/media/MediaPage";
import { WartaPage } from "@/features/panel/admin/warta/WartaPage";
import { AlkitabPage } from "@/features/panel/admin/alkitab/AlkitabPage";

// Anggaran Pages
import { AnggaranPlanningPage } from "@/features/panel/admin/anggaran/AnggaranPlanningPage";
import { AnggaranRealizationPage } from "@/features/panel/admin/anggaran/AnggaranRealizationPage";
import { AnggaranEvaluationPage } from "@/features/panel/admin/anggaran/AnggaranEvaluationPage";
import { AnggaranAnnualPage } from "@/features/panel/admin/anggaran/AnggaranAnnualPage";

// Master & Settings Pages
import { MasterChurchPage } from "@/features/panel/admin/master/MasterChurchPage";
import { MasterOrganizationPage } from "@/features/panel/admin/master/MasterOrganizationPage";
import { SettingsUsersPage } from "@/features/panel/admin/pengaturan/SettingsUsersPage";
import { SettingsRolesPage } from "@/features/panel/admin/pengaturan/SettingsRolesPage";
>>>>>>> f697f8a2aff351c48af75dbde6f03de37dda8f16

export const panelRoutes: RouteObject[] = [
  {
    path: "panel",
<<<<<<< HEAD
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
=======
    element: (
      <AuthGuard allowedRoles={[ROLES.USER]}>
        <PanelLayout />
      </AuthGuard>
    ),
    children: [
      // Base User Routes
      {
        path: "dashboard",
        element: <UserDashboardPage />,
      },
      {
        path: "profile",
        children: [
          {
            path: "personal",
            element: <UserProfilePage />,
          },
          {
            path: "family",
            element: <UserFamilyPage />,
          },
        ],
      },
      {
        path: "documents",
        element: <UserDocumentsPage />,
      },
      {
        path: "events",
        element: <UserEventsPage />,
      },
      {
        path: "offerings",
        element: <UserOfferingsPage />,
      },

      // Sekretariat Routes
      {
        path: "jemaat",
        children: [
          {
            path: "data",
            element: (
              <AuthGuard allowedRoles={[ROLES.SEKRETARIAT, ROLES.MAJELIS]}>
                <JemaatDataPage />
              </AuthGuard>
            ),
          },
          {
            path: "family",
            element: (
              <AuthGuard allowedRoles={[ROLES.SEKRETARIAT, ROLES.MAJELIS]}>
                <JemaatFamilyPage />
              </AuthGuard>
            ),
          },
          {
            path: "mutation",
            element: (
              <AuthGuard allowedRoles={[ROLES.SEKRETARIAT]}>
                <JemaatMutationPage />
              </AuthGuard>
            ),
          },
          {
            path: "sacrament",
            element: (
              <AuthGuard allowedRoles={[ROLES.SEKRETARIAT]}>
                <JemaatSacramentPage />
              </AuthGuard>
            ),
          },
        ],
      },

      // Ibadah & Pelayanan Routes
      {
        path: "ibadah",
        children: [
          {
            path: "schedule",
            element: (
              <AuthGuard allowedRoles={[ROLES.MAJELIS, ROLES.PELAYANAN]}>
                <IbadahSchedulePage />
              </AuthGuard>
            ),
          },
          {
            path: "attendance",
            element: (
              <AuthGuard allowedRoles={[ROLES.MAJELIS, ROLES.PELAYANAN]}>
                <IbadahAttendancePage />
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: "pelayanan",
        children: [
          {
            path: "teams",
            element: (
              <AuthGuard allowedRoles={[ROLES.MAJELIS, ROLES.PELAYANAN]}>
                <PelayananTeamsPage />
              </AuthGuard>
            ),
          },
          {
            path: "schedule",
            element: (
              <AuthGuard allowedRoles={[ROLES.MAJELIS, ROLES.PELAYANAN]}>
                <PelayananSchedulePage />
              </AuthGuard>
            ),
          },
        ],
      },

      // Keuangan Routes
      {
        path: "keuangan-operasional",
        children: [
          {
            path: "offerings/input",
            element: (
              <AuthGuard allowedRoles={[ROLES.BENDAHARA]}>
                <KeuanganOfferingsPage />
              </AuthGuard>
            ),
          },
          {
            path: "cash",
            element: (
              <AuthGuard allowedRoles={[ROLES.BENDAHARA]}>
                <KeuanganCashPage />
              </AuthGuard>
            ),
          },
          {
            path: "reports/weekly",
            element: (
              <AuthGuard allowedRoles={[ROLES.BENDAHARA]}>
                <KeuanganWeeklyPage />
              </AuthGuard>
            ),
          },
          {
            path: "reports/monthly",
            element: (
              <AuthGuard allowedRoles={[ROLES.BENDAHARA]}>
                <KeuanganMonthlyPage />
              </AuthGuard>
            ),
          },
        ],
      },

      // Admin Routes
      {
        path: "admin",
        element: (
          <AuthGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <AdminDashboardPage />
          </AuthGuard>
        ),
      },
      {
        path: "admin/artikel",
        element: (
          <AuthGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <ArtikelPage />
          </AuthGuard>
        ),
      },
      {
        path: "admin/media",
        element: (
          <AuthGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <MediaPage />
          </AuthGuard>
        ),
      },
      {
        path: "admin/warta",
        element: (
          <AuthGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <WartaPage />
          </AuthGuard>
        ),
      },
      {
        path: "admin/alkitab",
        element: (
          <AuthGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <AlkitabPage />
          </AuthGuard>
        ),
      },

      // Anggaran Routes
      {
        path: "admin/anggaran",
        children: [
          {
            path: "planning",
            element: (
              <AuthGuard allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                <AnggaranPlanningPage />
              </AuthGuard>
            ),
          },
          {
            path: "realization",
            element: (
              <AuthGuard allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                <AnggaranRealizationPage />
              </AuthGuard>
            ),
          },
          {
            path: "evaluation",
            element: (
              <AuthGuard allowedRoles={[ROLES.SUPER_ADMIN]}>
                <AnggaranEvaluationPage />
              </AuthGuard>
            ),
          },
          {
            path: "annual-report",
            element: (
              <AuthGuard allowedRoles={[ROLES.SUPER_ADMIN]}>
                <AnggaranAnnualPage />
              </AuthGuard>
            ),
          },
        ],
      },

      // Master & Settings Routes
      {
        path: "admin/master",
        children: [
          {
            path: "church",
            element: (
              <AuthGuard allowedRoles={[ROLES.SUPER_ADMIN]}>
                <MasterChurchPage />
              </AuthGuard>
            ),
          },
          {
            path: "organization",
            element: (
              <AuthGuard allowedRoles={[ROLES.SUPER_ADMIN]}>
                <MasterOrganizationPage />
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: "admin/settings",
        children: [
          {
            path: "users",
            element: (
              <AuthGuard allowedRoles={[ROLES.SUPER_ADMIN]}>
                <SettingsUsersPage />
              </AuthGuard>
            ),
          },
          {
            path: "roles",
            element: (
              <AuthGuard allowedRoles={[ROLES.SUPER_ADMIN]}>
                <SettingsRolesPage />
              </AuthGuard>
            ),
          },
        ],
      },
    ],
  },
>>>>>>> f697f8a2aff351c48af75dbde6f03de37dda8f16
];
