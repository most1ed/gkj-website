import { RouteObject } from 'react-router-dom';
import { PanelLayout } from '@/layouts/PanelLayout';
import { lazy, Suspense } from "react";
import { Navigate } from 'react-router-dom';
import { protectedRoute } from './route-utils';
import { UserRole } from './types';
import { BookOpen } from 'lucide-react';
import { ErrorBoundary } from '@/components/ui/error-boundary';

const ProfilePage = lazy(() => import('@/features/panel/base/profile/ProfilePage'));
const DocumentsPage = lazy(() => import("@/features/panel/base/documents/DocumentsPage"));
const UserEventsPage = lazy(() => import("@/features/panel/base/events/UserEventsPage"));
const UserOfferingsPage = lazy(() => import("@/features/panel/base/offerings/UserOfferingsPage"));
const JemaatPage = lazy(() => import("@/features/panel/management/jemaat/JemaatPage"));
const IbadahPage = lazy(() => import("@/features/panel/management/ibadah/IbadahPage"));
const PelayananPage = lazy(() => import("@/features/panel/management/pelayanan/PelayananPage"));
const KeuanganPage = lazy(() => import("@/features/panel/management/keuangan/KeuanganPage"));
const SDAPage = lazy(() => import("@/features/panel/management/sda/SDAPage"));
const RencanaKerjaPage = lazy(() => import("@/features/panel/management/rencana/RencanaKerjaPage"));
const KontenPage = lazy(() => import("@/features/panel/admin/konten/KontenPage"));
const ArtikelPage = lazy(() => import("@/features/panel/admin/artikel/ArtikelPage"));
const MasterPage = lazy(() => import("@/features/panel/admin/master/MasterPage"));
const AlkitabPage = lazy(() => import("@/features/panel/admin/alkitab/AlkitabPage"));
const MediaPage = lazy(() => import("@/features/panel/admin/media/MediaPage"));
const PengaturanPage = lazy(() => import("@/features/panel/admin/pengaturan/PengaturanPage"));
const FlexDashboardPage = lazy(() => import('@/features/panel/flexdash/pages/FlexDashboardPage'));
import { OfferingTypeManagement } from '@/features/panel/base/offerings/components/OfferingTypeManagement';

// Error fallback components (optional, can be customized)
const DashboardErrorFallback = () => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-destructive">
      Gagal Memuat Dashboard
    </h2>
    <p>Silakan refresh halaman atau hubungi dukungan teknis.</p>
  </div>
);

const ManagementErrorFallback = () => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-destructive">
      Gagal Memuat Halaman Manajemen
    </h2>
    <p>Data tidak dapat dimuat. Silakan periksa koneksi atau coba lagi nanti.</p>
  </div>
);

const AdminErrorFallback = () => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-destructive">
      Gagal Memuat Halaman Admin
    </h2>
    <p>Data tidak dapat dimuat. Silakan periksa koneksi atau coba lagi nanti.</p>
  </div>
);

export const panelRoutes: RouteObject[] = [
  {
    path: '/panel',
    element: <PanelLayout />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary fallback={<DashboardErrorFallback />}>
            <Suspense fallback={<div>Loading...</div>}>
              <FlexDashboardPage />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: 'flexdash',
        element: (
          <ErrorBoundary fallback={<DashboardErrorFallback />}>
            <Suspense fallback={<div>Loading...</div>}>
              <FlexDashboardPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'profile',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <ProfilePage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'documents',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <DocumentsPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'events',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <UserEventsPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'offerings',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <UserOfferingsPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'offerings/types',
        element: (
          <ErrorBoundary>
            <OfferingTypeManagement />
          </ErrorBoundary>
        ),
        meta: {
          title: 'Manajemen Jenis Persembahan',
          roles: [UserRole.ADMIN, UserRole.STAFF],
          icon: <BookOpen />,
        }
      },
      {
        path: 'management',
        children: [
          {
            path: 'jemaat',
            element: (
              <ErrorBoundary fallback={<ManagementErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <JemaatPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'ibadah',
            element: (
              <ErrorBoundary fallback={<ManagementErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <IbadahPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'pelayanan',
            element: (
              <ErrorBoundary fallback={<ManagementErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <PelayananPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'keuangan',
            element: (
              <ErrorBoundary fallback={<ManagementErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <KeuanganPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'sda',
            element: (
              <ErrorBoundary fallback={<ManagementErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <SDAPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'rencana',
            element: (
              <ErrorBoundary fallback={<ManagementErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <RencanaKerjaPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
        ]
      },
      {
        path: 'admin',
        children: [
          {
            path: 'konten',
            element: (
              <ErrorBoundary fallback={<AdminErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <KontenPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'artikel',
            element: (
              <ErrorBoundary fallback={<AdminErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <ArtikelPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'master',
            element: (
              <ErrorBoundary fallback={<AdminErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <MasterPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'alkitab',
            element: (
              <ErrorBoundary fallback={<AdminErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <AlkitabPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'media',
            element: (
              <ErrorBoundary fallback={<AdminErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <MediaPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: 'pengaturan',
            element: (
              <ErrorBoundary fallback={<AdminErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                  <PengaturanPage />
                </Suspense>
              </ErrorBoundary>
            ),
          }
        ]
      },
    ]
  }
];
