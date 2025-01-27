import {
  Home,
  User,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Church,
  HeartHandshake,
  Wallet,
  Layout,
  Image,
  FileEdit,
  Book,
  Database,
  Settings
} from 'lucide-react';

export const sidebarConfig = {
  // Base User Menu
  baseMenu: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home
    },
    {
      title: 'Profil',
      href: '/dashboard/profile',
      icon: User
    },
    {
      title: 'Dokumen',
      href: '/dashboard/documents',
      icon: FileText
    },
    {
      title: 'Kegiatan',
      href: '/dashboard/events',
      icon: Calendar
    },
    {
      title: 'Persembahan',
      href: '/dashboard/offerings',
      icon: DollarSign
    }
  ],

  // Majelis Menu
  majelisMenu: [
    {
      title: 'Jemaat',
      href: '/dashboard/jemaat',
      icon: Users
    },
    {
      title: 'Ibadah',
      href: '/dashboard/ibadah',
      icon: Church
    },
    {
      title: 'Pelayanan',
      href: '/dashboard/pelayanan',
      icon: HeartHandshake
    },
    {
      title: 'Keuangan',
      href: '/dashboard/keuangan',
      icon: Wallet
    }
  ],

  // Admin Menu
  adminMenu: [
    {
      title: 'Konten',
      href: '/dashboard/konten',
      icon: Layout
    },
    {
      title: 'Media',
      href: '/dashboard/media',
      icon: Image
    },
    {
      title: 'Artikel',
      href: '/dashboard/artikel',
      icon: FileEdit
    },
    {
      title: 'Alkitab',
      href: '/dashboard/alkitab',
      icon: Book
    },
    {
      title: 'Master',
      href: '/dashboard/master',
      icon: Database
    },
    {
      title: 'Pengaturan',
      href: '/dashboard/pengaturan',
      icon: Settings
    }
  ]
};
