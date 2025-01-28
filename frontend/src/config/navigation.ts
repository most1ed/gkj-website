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
        href: '/DummyPage',
        icon: Home,
        description: 'Overview dan statistik umum'
      },
      {
        title: 'Profil',
        href: '/DummyPage',
        icon: User,
        description: 'Manajemen profil pengguna'
      },
      {
        title: 'Dokumen',
        href: '/DummyPage',
        icon: FileText,
        description: 'Manajemen dokumen',
        children: [
          {
            title: 'Dokumen Saya',
            href: '/DummyPage',
            description: 'Kelola dokumen pribadi'
          }
        ]
      },
      {
        title: 'Kegiatan',
        href: '/DummyPage',
        icon: Calendar,
        description: 'Daftar kegiatan'
      },
      {
        title: 'Keuangan',
        href: '/DummyPage',
        icon: DollarSign,
        description: 'Laporan keuangan'
      },
      {
        title: 'Pelayanan',
        href: '/DummyPage',
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
        title: 'Dashboard Admin',
        href: '/DummyPage',
        icon: Home,
        description: 'Overview dan statistik admin'
      },
      {
        title: 'Konten',
        href: '/DummyPage',
        icon: FileEdit,
        description: 'Manajemen konten',
        children: [
          {
            title: 'Tentang Gereja',
            href: '/DummyPage',
            description: 'Informasi gereja'
          },
          {
            title: 'Sejarah',
            href: '/DummyPage',
            description: 'Sejarah gereja'
          },
          {
            title: 'Visi & Misi',
            href: '/DummyPage',
            description: 'Visi dan misi'
          },
          {
            title: 'Organisasi',
            href: '/DummyPage',
            description: 'Struktur organisasi'
          }
        ]
      },
      {
        title: 'Media',
        href: '/DummyPage',
        icon: Image,
        description: 'Manajemen media',
        children: [
          {
            title: 'Galeri',
            href: '/DummyPage',
            description: 'Galeri foto'
          },
          {
            title: 'Video',
            href: '/DummyPage',
            description: 'Manajemen video'
          },
          {
            title: 'Khotbah',
            href: '/DummyPage',
            description: 'Rekaman khotbah'
          }
        ]
      },
      {
        title: 'Artikel',
        href: '/DummyPage',
        icon: FileText,
        description: 'Manajemen artikel',
        children: [
          {
            title: 'Daftar Artikel',
            href: '/DummyPage',
            description: 'Kelola artikel'
          },
          {
            title: 'Kategori',
            href: '/DummyPage',
            description: 'Kategori artikel'
          },
          {
            title: 'Tag',
            href: '/DummyPage',
            description: 'Tag artikel'
          }
        ]
      },
      {
        title: 'Alkitab',
        href: '/DummyPage',
        icon: BookOpen,
        description: 'Manajemen alkitab',
        children: [
          {
            title: 'Bacaan Harian',
            href: '/DummyPage',
            description: 'Bacaan alkitab harian'
          },
          {
            title: 'Renungan',
            href: '/DummyPage',
            description: 'Renungan harian'
          },
          {
            title: 'Pengaturan',
            href: '/DummyPage',
            description: 'Pengaturan alkitab'
          }
        ]
      },
      {
        title: 'Master',
        href: '/DummyPage',
        icon: Database,
        description: 'Data master',
        children: [
          {
            title: 'Data Majelis',
            href: '/DummyPage',
            description: 'Manajemen majelis'
          },
          {
            title: 'Data Pengguna',
            href: '/DummyPage',
            description: 'Manajemen pengguna'
          }
        ]
      },
      {
        title: 'Pengaturan',
        href: '/DummyPage',
        icon: Settings,
        description: 'Pengaturan sistem',
        children: [
          {
            title: 'Website',
            href: '/DummyPage',
            description: 'Pengaturan website'
          },
          {
            title: 'Email',
            href: '/DummyPage',
            description: 'Pengaturan email'
          },
          {
            title: 'Backup',
            href: '/DummyPage',
            description: 'Backup data'
          }
        ]
      }
    ]
  }
];
