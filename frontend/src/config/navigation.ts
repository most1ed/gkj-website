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
          },
          {
            title: 'Permintaan Dokumen',
            href: '/dashboard/document-requests',
            description: 'Status permintaan dokumen'
          }
        ]
      },
      {
        title: 'Kegiatan',
        href: '/dashboard/events',
        icon: Calendar,
        description: 'Informasi kegiatan',
        children: [
          {
            title: 'Kalender',
            href: '/dashboard/events',
            description: 'Kalender kegiatan'
          },
          {
            title: 'Pendaftaran',
            href: '/dashboard/events/registration',
            description: 'Pendaftaran acara'
          }
        ]
      },
      {
        title: 'Persembahan',
        href: '/dashboard/offerings',
        icon: DollarSign,
        description: 'Manajemen persembahan',
        children: [
          {
            title: 'Riwayat',
            href: '/dashboard/offerings/history',
            description: 'Riwayat persembahan'
          },
          {
            title: 'Pembayaran',
            href: '/dashboard/offerings/payment',
            description: 'Pembayaran persembahan'
          }
        ]
      }
    ]
  }
];

// Majelis Navigation
export const majelisNavigation = [
  {
    title: 'Menu Majelis',
    items: [
      {
        title: 'Jemaat',
        href: '/dashboard/jemaat',
        icon: Users,
        description: 'Manajemen jemaat',
        children: [
          {
            title: 'Database',
            href: '/dashboard/jemaat',
            description: 'Database jemaat'
          },
          {
            title: 'Keanggotaan',
            href: '/dashboard/jemaat/membership',
            description: 'Manajemen keanggotaan'
          }
        ]
      },
      {
        title: 'Ibadah',
        href: '/dashboard/ibadah',
        icon: Church,
        description: 'Manajemen ibadah',
        children: [
          {
            title: 'Jadwal',
            href: '/dashboard/services-schedule',
            description: 'Jadwal ibadah'
          },
          {
            title: 'Liturgi',
            href: '/dashboard/services-liturgy',
            description: 'Liturgi ibadah'
          },
          {
            title: 'Pengumuman',
            href: '/dashboard/services-announcements',
            description: 'Pengumuman ibadah'
          }
        ]
      },
      {
        title: 'Pelayanan',
        href: '/dashboard/pelayanan',
        icon: HeartHandshake,
        description: 'Manajemen pelayanan',
        children: [
          {
            title: 'Pastoral',
            href: '/dashboard/ministry-pastoral',
            description: 'Pelayanan pastoral'
          },
          {
            title: 'Diakonia',
            href: '/dashboard/ministry-diakonia',
            description: 'Pelayanan diakonia'
          }
        ]
      },
      {
        title: 'Keuangan',
        href: '/dashboard/finance',
        icon: PiggyBank,
        description: 'Manajemen keuangan',
        children: [
          {
            title: 'Laporan',
            href: '/dashboard/finance/reports',
            description: 'Laporan keuangan'
          },
          {
            title: 'Persembahan',
            href: '/dashboard/finance/offerings',
            description: 'Manajemen persembahan'
          }
        ]
      }
    ]
  }
];

// Admin Navigation
export const adminNavigation = [
  {
    title: 'Menu Admin',
    items: [
      {
        title: 'Konten',
        href: '/dashboard/konten',
        icon: FileEdit,
        description: 'Manajemen konten',
        children: [
          {
            title: 'Tentang Gereja',
            href: '/dashboard/content/about',
            description: 'Informasi gereja'
          },
          {
            title: 'Sejarah',
            href: '/dashboard/content/history',
            description: 'Sejarah gereja'
          },
          {
            title: 'Visi & Misi',
            href: '/dashboard/content/vision-mission',
            description: 'Visi dan misi'
          },
          {
            title: 'Organisasi',
            href: '/dashboard/content/organization',
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
            href: '/dashboard/articles/articles',
            description: 'Kelola artikel'
          },
          {
            title: 'Kategori',
            href: '/dashboard/articles/categories',
            description: 'Kategori artikel'
          },
          {
            title: 'Tag',
            href: '/dashboard/articles/tags',
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
            href: '/dashboard/bible/daily-reading',
            description: 'Bacaan alkitab harian'
          },
          {
            title: 'Renungan',
            href: '/dashboard/bible/devotional',
            description: 'Renungan harian'
          },
          {
            title: 'Pengaturan',
            href: '/dashboard/bible/settings',
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
            href: '/dashboard/master-council',
            description: 'Manajemen majelis'
          },
          {
            title: 'Data Pengguna',
            href: '/dashboard/master-users',
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
            href: '/dashboard/settings-website',
            description: 'Pengaturan website'
          },
          {
            title: 'Email',
            href: '/dashboard/settings-email',
            description: 'Pengaturan email'
          },
          {
            title: 'Backup',
            href: '/dashboard/settings-backup',
            description: 'Backup data'
          }
        ]
      }
    ]
  }
];
