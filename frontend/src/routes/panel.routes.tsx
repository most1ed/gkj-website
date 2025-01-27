import { RouteObject } from "react-router-dom";

// Temporarily disabled panel routes
export const panelRoutes: RouteObject[] = [];

/* Will be enabled later
import { PanelLayout } from "@/layouts/PanelLayout";
import { AuthGuard } from "@/features/auth/components/AuthGuard";

// Base User Pages
import { UserDashboardPage } from "@/features/panel/base/dashboard/DashboardPage";
import { UserProfilePage } from "@/features/panel/base/profile/ProfilePage";
import { UserDocumentsPage } from "@/features/panel/base/documents/DocumentsPage";
import { UserEventsPage } from "@/features/panel/base/events/EventsPage";
import { UserOfferingsPage } from "@/features/panel/base/offerings/OfferingsPage";

// Management Pages
import { JemaatPage } from "@/features/panel/management/jemaat/JemaatPage";
import { IbadahPage } from "@/features/panel/management/ibadah/IbadahPage";
import { PelayananPage } from "@/features/panel/management/pelayanan/PelayananPage";
import { KeuanganPage } from "@/features/panel/management/keuangan/KeuanganPage";

// Admin Pages
import { AdminDashboardPage } from "@/features/panel/admin/dashboard/DashboardPage";
import { KontenPage } from "@/features/panel/admin/konten/KontenPage";
import { MediaPage } from "@/features/panel/admin/media/MediaPage";
import { ArtikelPage } from "@/features/panel/admin/artikel/ArtikelPage";
import { AlkitabPage } from "@/features/panel/admin/alkitab/AlkitabPage";
import { MasterPage } from "@/features/panel/admin/master/MasterPage";
import { PengaturanPage } from "@/features/panel/admin/pengaturan/PengaturanPage";

export const panelRoutes: RouteObject[] = [
  {
    path: "/panel",
    element: (
      <AuthGuard>
        <PanelLayout />
      </AuthGuard>
    ),
    children: [
      // Base User Routes
      { index: true, element: <UserDashboardPage /> },
      { path: "profile", element: <UserProfilePage /> },
      { path: "documents", element: <UserDocumentsPage /> },
      { path: "events", element: <UserEventsPage /> },
      { path: "offerings", element: <UserOfferingsPage /> },

      // Management Routes
      { path: "jemaat", element: <JemaatPage /> },
      { path: "ibadah", element: <IbadahPage /> },
      { path: "pelayanan", element: <PelayananPage /> },
      { path: "keuangan", element: <KeuanganPage /> },

      // Admin Routes
      { path: "admin", element: <AdminDashboardPage /> },
      { path: "admin/konten", element: <KontenPage /> },
      { path: "admin/media", element: <MediaPage /> },
      { path: "admin/artikel", element: <ArtikelPage /> },
      { path: "admin/alkitab", element: <AlkitabPage /> },
      { path: "admin/master", element: <MasterPage /> },
      { path: "admin/pengaturan", element: <PengaturanPage /> },
    ],
  },
];
*/
