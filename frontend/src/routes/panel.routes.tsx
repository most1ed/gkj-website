import { RouteObject } from 'react-router-dom';
import { PanelLayout } from '@/layouts/PanelLayout';
import { lazy, Suspense } from "react";

const DashboardPage = lazy(() => import("@/features/panel/admin/DashboardPage").then(module => ({ default: module.default })));
const ProfilePage = lazy(() => import("@/features/panel/base/profile/ProfilePage"));
const DocumentsPage = lazy(() => import("@/features/panel/base/documents/DocumentsPage"));
const UserEventsPage = lazy(() => import("@/features/panel/base/events/UserEventsPage"));
const UserOfferingsPage = lazy(() => import("@/features/panel/base/offerings/UserOfferingsPage"));
const JemaatPage = lazy(() => import("@/features/panel/management/jemaat/JemaatPage"));
const IbadahPage = lazy(() => import("@/features/panel/management/ibadah/IbadahPage"));
const PelayananPage = lazy(() => import("@/features/panel/management/pelayanan/PelayananPage"));
const KeuanganPage = lazy(() => import("@/features/panel/management/keuangan/KeuanganPage"));
const SDAPage = lazy(() => import("@/features/panel/management/sda/SDAPage"));
const RencanaKerjaPage = lazy(() => import("@/features/panel/management/rencana/RencanaKerjaPage").then(module => ({ default: module.default })));
const KontenPage = lazy(() => import("@/features/panel/admin/konten/KontenPage"));
const ArtikelPage = lazy(() => import("@/features/panel/admin/artikel/ArtikelPage"));
const MasterPage = lazy(() => import("@/features/panel/admin/master/MasterPage"));
const AlkitabPage = lazy(() => import("@/features/panel/admin/alkitab/AlkitabPage"));
const MediaPage = lazy(() => import("@/features/panel/admin/media/MediaPage"));
const PengaturanPage = lazy(() => import("@/features/panel/admin/pengaturan/PengaturanPage"));

export const panelRoutes: RouteObject[] = [
  {
    path: '/panel',
    element: <PanelLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: 'documents',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DocumentsPage />
          </Suspense>
        ),
      },
      {
        path: 'events',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserEventsPage />
          </Suspense>
        ),
      },
      {
        path: 'offerings',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserOfferingsPage />
          </Suspense>
        ),
      },
      {
        path: 'jemaat',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <JemaatPage />
          </Suspense>
        ),
      },
      {
        path: 'ibadah',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <IbadahPage />
          </Suspense>
        ),
      },
      {
        path: 'pelayanan',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PelayananPage />
          </Suspense>
        ),
      },
      {
        path: 'keuangan',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <KeuanganPage />
          </Suspense>
        ),
      },
      {
        path: 'sda',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SDAPage />
          </Suspense>
        ),
      },
      {
        path: 'rencana',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RencanaKerjaPage />
          </Suspense>
        ),
      },
      {
        path: 'admin/konten',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <KontenPage />
          </Suspense>
        ),
      },
      {
        path: 'admin/artikel',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ArtikelPage />
          </Suspense>
        ),
      },
      {
        path: 'admin/master',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MasterPage />
          </Suspense>
        ),
      },
      {
        path: 'admin/alkitab',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AlkitabPage />
          </Suspense>
        ),
      },
      {
        path: 'admin/media',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MediaPage />
          </Suspense>
        ),
      },
      {
        path: 'admin/pengaturan',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PengaturanPage />
          </Suspense>
        ),
      },
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardPage />
          </Suspense>
        ),
      },
    ],
  },
];
