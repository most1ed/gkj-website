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

export const panelRoutes: RouteObject[] = [
  {
    path: "panel",
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
];
