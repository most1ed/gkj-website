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
        href: '/panel/dashboard',
        icon: Home,
        description: 'Overview dan statistik umum'
      },
      {
        title: 'Profil',
        href: '/panel/profile',
        icon: User,
        description: 'Manajemen profil pengguna'
      },
      {
        title: 'Dokumen',
        href: '/panel/documents',
        icon: FileText,
        description: 'Manajemen dokumen',
        children: [
          {
            title: 'Dokumen Saya',
            href: '/panel/documents',
            description: 'Kelola dokumen pribadi'
          },
          {
            title: 'Permintaan Dokumen',
            href: '/panel/document-requests',
            description: 'Status permintaan dokumen'
          }
        ]
      },
      {
        title: 'Kegiatan',
        href: '/panel/events',
        icon: Calendar,
        description: 'Informasi kegiatan',
        children: [
          {
            title: 'Kalender',
            href: '/panel/events',
            description: 'Kalender kegiatan'
          },
          {
            title: 'Pendaftaran',
            href: '/panel/events/registration',
            description: 'Pendaftaran acara'
          }
        ]
      },
      {
        title: 'Persembahan',
        href: '/panel/offerings',
        icon: DollarSign,
        description: 'Manajemen persembahan',
        children: [
          {
            title: 'Riwayat',
            href: '/panel/offerings/history',
            description: 'Riwayat persembahan'
          },
          {
            title: 'Pembayaran',
            href: '/panel/offerings/payment',
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
        href: '/panel/management/jemaat',
        icon: Users,
        description: 'Manajemen jemaat',
        children: [
          {
            title: 'Database',
            href: '/panel/management/jemaat',
            description: 'Database jemaat'
          },
          {
            title: 'Keanggotaan',
            href: '/panel/management/jemaat/membership',
            description: 'Manajemen keanggotaan'
          }
        ]
      },
      {
        title: 'Ibadah',
        href: '/panel/management/ibadah',
        icon: Church,
        description: 'Manajemen ibadah',
        children: [
          {
            title: 'Jadwal',
            href: '/panel/management/ibadah/schedule',
            description: 'Jadwal ibadah'
          },
          {
            title: 'Liturgi',
            href: '/panel/management/ibadah/liturgy',
            description: 'Liturgi ibadah'
          },
          {
            title: 'Pengumuman',
            href: '/panel/management/ibadah/announcements',
            description: 'Pengumuman ibadah'
          }
        ]
      },
      {
        title: 'Pelayanan',
        href: '/panel/management/pelayanan',
        icon: HeartHandshake,
        description: 'Manajemen pelayanan',
        children: [
          {
            title: 'Tim Pelayanan',
            href: '/panel/management/pelayanan/teams',
            description: 'Tim pelayanan'
          },
          {
            title: 'Jadwal',
            href: '/panel/management/pelayanan/schedule',
            description: 'Jadwal pelayanan'
          }
        ]
      },
      {
        title: 'Keuangan',
        href: '/panel/management/keuangan',
        icon: PiggyBank,
        description: 'Manajemen keuangan'
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
        href: '/panel/admin/konten',
        icon: FileEdit,
        description: 'Manajemen konten'
      },
      {
        title: 'Media',
        href: '/panel/admin/media',
        icon: Image,
        description: 'Manajemen media',
        children: [
          {
            title: 'Galeri Foto',
            href: '/panel/admin/media/photos',
            description: 'Manajemen foto'
          },
          {
            title: 'Galeri Video',
            href: '/panel/admin/media/videos',
            description: 'Manajemen video',
            icon: Video
          }
        ]
      },
      {
        title: 'Alkitab',
        href: '/panel/admin/alkitab',
        icon: Book,
        description: 'Manajemen alkitab'
      },
      {
        title: 'Artikel',
        href: '/panel/admin/artikel',
        icon: BookOpen,
        description: 'Manajemen artikel'
      },
      {
        title: 'Data Master',
        href: '/panel/admin/master',
        icon: Database,
        description: 'Manajemen data master'
      },
      {
        title: 'Pengaturan',
        href: '/panel/admin/pengaturan',
        icon: Settings,
        description: 'Pengaturan sistem'
      }
    ]
  }
];
