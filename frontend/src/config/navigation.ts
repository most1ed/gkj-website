import { 
  Home, 
  User, 
  FileText, 
  Calendar, 
  DollarSign,
  Users,
  Church,
  HeartHandshake,
  PiggyBank,
  FileEdit,
  Image,
  Video,
  Book,
  Settings,
  Database,
  Mail,
  Save,
  Bookmark,
  Tags,
  BookOpen,
  UserCog
} from 'lucide-react';

// Basic User Navigation
export const userNavigation = [
  {
    title: 'Menu Dasar',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
        description: 'Overview dan statistik umum'
      },
      {
        title: 'Profil',
        href: '/dashboard/profile',
        icon: User,
        description: 'Manajemen profil pengguna'
      },
      {
        title: 'Dokumen',
        href: '/dashboard/documents',
        icon: FileText,
        description: 'Manajemen dokumen',
        children: [
          {
            title: 'Dokumen Saya',
            href: '/dashboard/documents',
            description: 'Kelola dokumen pribadi'
          }
        ]
      },
      {
        title: 'Kegiatan',
        href: '/dashboard/events',
        icon: Calendar,
        description: 'Daftar kegiatan'
      },
      {
        title: 'Keuangan',
        href: '/dashboard/finance',
        icon: DollarSign,
        description: 'Laporan keuangan'
      },
      {
        title: 'Pelayanan',
        href: '/dashboard/service',
        icon: HeartHandshake,
        description: 'Informasi pelayanan'
      }
    ]
  }
];

export const adminNavigation = [
  {
    title: 'Menu Admin',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
        description: 'Overview dan statistik umum'
      },
      {
        title: 'Konten',
        href: '/dashboard/konten',
        icon: FileEdit,
        description: 'Manajemen konten',
        children: [
          {
            title: 'Tentang Gereja',
            href: '/dashboard/konten/about',
            description: 'Informasi gereja'
          },
          {
            title: 'Sejarah',
            href: '/dashboard/konten/history',
            description: 'Sejarah gereja'
          },
          {
            title: 'Visi & Misi',
            href: '/dashboard/konten/vision-mission',
            description: 'Visi dan misi'
          },
          {
            title: 'Organisasi',
            href: '/dashboard/konten/organization',
            description: 'Struktur organisasi'
          }
        ]
      },
      {
        title: 'Media',
        href: '/dashboard/media',
        icon: Image,
        description: 'Manajemen media',
        children: [
          {
            title: 'Galeri',
            href: '/dashboard/media/gallery',
            description: 'Galeri foto'
          },
          {
            title: 'Video',
            href: '/dashboard/media/videos',
            description: 'Manajemen video'
          },
          {
            title: 'Khotbah',
            href: '/dashboard/media/sermons',
            description: 'Rekaman khotbah'
          }
        ]
      },
      {
        title: 'Artikel',
        href: '/dashboard/artikel',
        icon: FileText,
        description: 'Manajemen artikel',
        children: [
          {
            title: 'Daftar Artikel',
            href: '/dashboard/artikel/articles',
            description: 'Kelola artikel'
          },
          {
            title: 'Kategori',
            href: '/dashboard/artikel/categories',
            description: 'Kategori artikel'
          },
          {
            title: 'Tag',
            href: '/dashboard/artikel/tags',
            description: 'Tag artikel'
          }
        ]
      },
      {
        title: 'Alkitab',
        href: '/dashboard/alkitab',
        icon: BookOpen,
        description: 'Manajemen alkitab',
        children: [
          {
            title: 'Bacaan Harian',
            href: '/dashboard/alkitab/daily-reading',
            description: 'Bacaan alkitab harian'
          },
          {
            title: 'Renungan',
            href: '/dashboard/alkitab/devotional',
            description: 'Renungan harian'
          },
          {
            title: 'Pengaturan',
            href: '/dashboard/alkitab/settings',
            description: 'Pengaturan alkitab'
          }
        ]
      },
      {
        title: 'Master',
        href: '/dashboard/master',
        icon: Database,
        description: 'Data master',
        children: [
          {
            title: 'Data Majelis',
            href: '/dashboard/master/council',
            description: 'Manajemen majelis'
          },
          {
            title: 'Data Pengguna',
            href: '/dashboard/master/users',
            description: 'Manajemen pengguna'
          }
        ]
      },
      {
        title: 'Pengaturan',
        href: '/dashboard/pengaturan',
        icon: Settings,
        description: 'Pengaturan sistem',
        children: [
          {
            title: 'Website',
            href: '/dashboard/pengaturan/website',
            description: 'Pengaturan website'
          },
          {
            title: 'Email',
            href: '/dashboard/pengaturan/email',
            description: 'Pengaturan email'
          },
          {
            title: 'Backup',
            href: '/dashboard/pengaturan/backup',
            description: 'Backup data'
          }
        ]
      }
    ]
  }
];
