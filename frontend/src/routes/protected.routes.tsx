import { RouteObject } from "react-router-dom";

// Temporarily disabled protected routes
export const protectedRoutes: RouteObject[] = [];

/* Will be enabled later
import { DashboardLayout } from "@/layouts/dashboard-layout";

// Base User Routes
import { UserProfilePage } from "@/features/dashboard/base/profile/UserProfilePage";
import { UserDocumentsPage } from "@/features/dashboard/base/documents/UserDocumentsPage";
import { UserEventsPage } from "@/features/dashboard/base/events/UserEventsPage";
import { UserOfferingsPage } from "@/features/dashboard/base/offerings/UserOfferingsPage";

// Majelis Routes
import { JemaatPage } from "@/features/dashboard/majelis/jemaat/JemaatPage";
import { IbadahPage } from "@/features/dashboard/majelis/ibadah/IbadahPage";
import { PelayananPage } from "@/features/dashboard/majelis/pelayanan/PelayananPage";
import { KeuanganPage } from "@/features/dashboard/majelis/keuangan/KeuanganPage";

// Admin Routes
import { KontenPage } from "@/features/dashboard/admin/konten/KontenPage";
import { MediaPage } from "@/features/dashboard/admin/media/MediaPage";
import { ArtikelPage } from "@/features/dashboard/admin/artikel/ArtikelPage";
import { AlkitabPage } from "@/features/dashboard/admin/alkitab/AlkitabPage";
import { MasterPage } from "@/features/dashboard/admin/master/MasterPage";
import { PengaturanPage } from "@/features/dashboard/admin/pengaturan/PengaturanPage";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // Base User Routes
      {
        path: "profile",
        element: <UserProfilePage />,
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

      // Majelis Routes
      {
        path: "jemaat",
        element: <JemaatPage />,
      },
      {
        path: "ibadah",
        element: <IbadahPage />,
      },
      {
        path: "pelayanan",
        element: <PelayananPage />,
      },
      {
        path: "keuangan",
        element: <KeuanganPage />,
      },

      // Admin Routes
      {
        path: "konten",
        element: <KontenPage />,
      },
      {
        path: "media",
        element: <MediaPage />,
      },
      {
        path: "artikel",
        element: <ArtikelPage />,
      },
      {
        path: "alkitab",
        element: <AlkitabPage />,
      },
      {
        path: "master",
        element: <MasterPage />,
      },
      {
        path: "pengaturan",
        element: <PengaturanPage />,
      },
    ],
  },
];
*/
