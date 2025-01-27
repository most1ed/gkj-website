# Struktur Frontend dan Routing GKJ Website

## Ikhtisar Arsitektur Frontend

### Filosofi Desain
- **Modularitas**: Komponen terpisah dan dapat digunakan kembali
- **Skalabilitas**: Struktur yang mendukung pertumbuhan aplikasi
- **Pemeliharaan**: Organisasi kode yang jelas dan intuitif

## Struktur Direktori

```
frontend/
│
├── public/                 # Aset statis
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── src/                    # Kode sumber utama
│   ├── app/                # Konfigurasi dan setup aplikasi
│   │   ├── providers/      # Context dan provider global
│   │   └── store/          # Manajemen state (Redux/Zustand)
│   │
│   ├── components/         # Komponen UI umum
│   │   ├── common/         # Komponen dasar (Button, Input)
│   │   ├── layout/         # Komponen tata letak
│   │   └── complex/        # Komponen kompleks
│   │
│   ├── features/           # Fitur spesifik aplikasi
│   │   ├── public/         # Fitur untuk pengguna umum
│   │   │   ├── bible/      # Fitur Alkitab
│   │   │   ├── schedule/   # Fitur Jadwal
│   │   │   └── worship/    # Fitur Ibadah
│   │   │
│   │   └── admin/          # Fitur untuk admin
│   │       ├── dashboard/
│   │       └── management/
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── auth/
│   │   └── data/
│   │
│   ├── lib/                # Utilitas dan helpers
│   │   ├── api/            # Konfigurasi dan fungsi API
│   │   ├── utils/          # Fungsi utilitas umum
│   │   └── validation/     # Skema validasi
│   │
│   ├── routes/             # Definisi rute
│   │   ├── public.routes.tsx
│   │   ├── admin.routes.tsx
│   │   └── dashboard.routes.tsx
│   │
│   ├── styles/             # Gaya dan tema
│   │   ├── global.css
│   │   └── theme.ts
│   │
│   └── types/              # Definisi TypeScript
│       ├── models/
│       └── interfaces/
│
├── tests/                  # Pengujian
│   ├── unit/
│   └── integration/
│
└── scripts/                # Skrip utilitas
```

## Strategi Routing

### Filosofi Routing
- **Deklaratif**: Rute didefinisikan secara eksplisit
- **Hierarkis**: Struktur rute yang jelas
- **Aman**: Pembatasan akses berbasis peran

### Konfigurasi Routing

#### Contoh Definisi Rute
```typescript
// src/routes/public.routes.tsx
import { RouteObject } from 'react-router-dom'

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'bible',
        element: <BiblePage />
      },
      {
        path: 'schedule',
        element: <SchedulePage />
      }
    ]
  }
]
```

#### Rute Terlindungi
```typescript
// src/routes/admin.routes.tsx
export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <ProtectedRoute roles={['ADMIN']} />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'users',
        element: <UserManagement />
      }
    ]
  }
]
```

#### Implementasi Routing
```typescript
// src/App.tsx
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom'

const router = createBrowserRouter([
  ...publicRoutes,
  ...adminRoutes,
  ...dashboardRoutes
])

function App() {
  return <RouterProvider router={router} />
}
```

### Jenis Rute

1. **Publik**
   - Dapat diakses tanpa otentikasi
   - Contoh: Halaman utama, informasi gereja

2. **Terlindungi**
   - Memerlukan otentikasi
   - Berbasis peran (admin, jemaat)

3. **Dinamis**
   - Rute dengan parameter
   - Contoh: Profil pengguna, detail jadwal

## Dokumentasi Routing Frontend Komprehensif

### Arsitektur Routing

#### Filosofi Desain
- **Deklaratif**: Definisi rute yang jelas dan eksplisit
- **Modular**: Pemisahan rute berdasarkan kategori
- **Aman**: Kontrol akses berbasis peran
- **Skalabel**: Mudah dikembangkan dan diperluas

#### Struktur Direktori Routing
```
src/routes/
│
├── public.routes.tsx       # Rute publik
├── protected.routes.tsx    # Rute terlindungi
├── auth.routes.tsx         # Rute autentikasi
└── panel.routes.tsx        # Rute panel khusus
```

### Jenis Rute

#### 1. Rute Publik
```typescript
export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "bible", element: <BiblePage /> },
      // Rute publik lainnya
    ]
  }
]
```

#### 2. Rute Terlindungi
```typescript
export const protectedRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <ProtectedRoute roles={['USER', 'ADMIN']}>,
    children: [
      { path: "profile", element: <UserProfilePage /> },
      { path: "events", element: <UserEventsPage /> },
      
      // Rute admin
      {
        path: "admin",
        element: <ProtectedRoute roles={['ADMIN']}>,
        children: [
          { path: "users", element: <UserManagementPage /> },
          { path: "settings", element: <SystemSettingsPage /> }
        ]
      }
    ]
  }
]
```

### Komponen Keamanan Routing

#### Implementasi ProtectedRoute
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

function ProtectedRoute({ 
  children, 
  roles = [] 
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  
  // Cek otentikasi
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  // Cek otorisasi berbasis peran
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }
  
  return children
}
```

### Strategi Manajemen Rute

#### 1. Lazy Loading
```typescript
// Contoh implementasi lazy loading rute
const DashboardPage = lazy(() => 
  import('@/features/dashboard/DashboardPage')
)

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
```

#### 2. Nested Routing
```typescript
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Rute publik
      ...publicRoutes,
      
      // Rute terlindungi
      {
        element: <ProtectedRoute />,
        children: [
          ...protectedRoutes,
          ...dashboardRoutes
        ]
      }
    ]
  }
])
```

### Penanganan Error dan Fallback

#### Error Boundary
```typescript
function ErrorBoundary() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorPage 
        title={error.status}
        message={error.statusText}
      />
    )
  }
  
  return <GeneralErrorPage />
}
```

### Praktik Terbaik

1. **Konsistensi Penamaan**
   - Gunakan penamaan deskriptif
   - Gunakan kebab-case untuk path
   - Gunakan nama yang bermakna

2. **Validasi Parameter**
```typescript
const router = createBrowserRouter([
  {
    path: "warta/:slug",
    element: <WartaDetailPage />,
    loader: async ({ params }) => {
      // Validasi parameter
      if (!isValidSlug(params.slug)) {
        throw new Response("Not Found", { status: 404 })
      }
      return fetchWartaDetail(params.slug)
    }
  }
])
```

3. **Konfigurasi Lanjutan**
```typescript
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/" 
      element={<RootLayout />}
      errorElement={<GlobalErrorBoundary />}
    >
      {/* Definisi rute */}
    </Route>
  )
)
```

### Rencana Pengembangan

#### Fase 1: Fondasi
- Implementasi rute publik
- Struktur routing dasar

#### Fase 2: Keamanan
- Implementasi rute terlindungi
- Manajemen peran pengguna
- Validasi akses

#### Fase 3: Optimasi
- Code splitting lanjutan
- Caching rute
- Prefetching

### Alat dan Referensi

- React Router v6+
- React Suspense
- TypeScript
- Zod (Validasi)

### Pertimbangan Masa Depan
- Routing berbasis file (Next.js style)
- Integrasi server-side rendering
- Optimasi performa routing dinamis

## Manajemen Akses

### Komponen ProtectedRoute
```typescript
function ProtectedRoute({ 
  children, 
  roles = [] 
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }
  
  return children
}
```

## Praktik Terbaik

- Gunakan kode splitting
- Implementasi lazy loading
- Validasi parameter rute
- Tangani kesalahan rute
- Pertahankan rute tetap sederhana

## Rencana Pengembangan

### Fase 1: Fondasi
- Implementasi struktur dasar
- Routing sederhana

### Fase 2: Penguatan
- Manajemen akses lanjutan
- Optimasi performa routing

### Fase 3: Inovasi
- Routing dinamis
- Integrasi dengan backend

## Alat & Referensi

- React Router
- React Suspense
- TypeScript
- Zod (Validasi)

**Terakhir Diperbarui**: 27 Januari 2025
