import { LucideIcon, Home, User, FileText, Calendar, Heart, Users, BookOpen, Building2, DollarSign, Settings, LayoutDashboard, Database } from 'lucide-react';

export interface NavigationItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  items?: Array<{
    title: string;
    href: string;
  }>;
}

export const userNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Profil',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    title: 'Dokumen',
    href: '/dashboard/documents',
    icon: FileText,
  },
  {
    title: 'Kegiatan',
    href: '/dashboard/events',
    icon: Calendar,
  },
  {
    title: 'Persembahan',
    href: '/dashboard/offerings',
    icon: Heart,
  },
];

export const majelisNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/majelis',
    icon: LayoutDashboard,
  },
  {
    title: 'Jemaat',
    icon: Users,
    items: [
      {
        title: 'Data Jemaat',
        href: '/majelis/members',
      },
      {
        title: 'Permohonan Dokumen',
        href: '/majelis/documents',
      },
    ],
  },
  {
    title: 'Ibadah',
    icon: BookOpen,
    items: [
      {
        title: 'Jadwal Ibadah',
        href: '/majelis/services/schedule',
      },
      {
        title: 'Liturgi',
        href: '/majelis/services/liturgy',
      },
      {
        title: 'Warta Jemaat',
        href: '/majelis/services/announcements',
      },
    ],
  },
  {
    title: 'Pelayanan',
    icon: Heart,
    items: [
      {
        title: 'Pastoral',
        href: '/majelis/ministry/pastoral',
      },
      {
        title: 'Diakonia',
        href: '/majelis/ministry/diakonia',
      },
    ],
  },
  {
    title: 'Keuangan',
    href: '/majelis/finance',
    icon: DollarSign,
  },
];

export const adminNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Master Data',
    icon: Database,
    items: [
      {
        title: 'Pengguna',
        href: '/admin/master/users',
      },
      {
        title: 'Jemaat',
        href: '/admin/master/members',
      },
      {
        title: 'Majelis',
        href: '/admin/master/council',
      },
    ],
  },
  {
    title: 'Konten',
    icon: FileText,
    items: [
      {
        title: 'Artikel',
        href: '/admin/content/articles',
      },
      {
        title: 'Pengumuman',
        href: '/admin/content/announcements',
      },
      {
        title: 'Galeri',
        href: '/admin/content/gallery',
      },
    ],
  },
  {
    title: 'Keuangan',
    icon: DollarSign,
    items: [
      {
        title: 'Transaksi',
        href: '/admin/finance/transactions',
      },
      {
        title: 'Laporan',
        href: '/admin/finance/reports',
      },
    ],
  },
  {
    title: 'Pengaturan',
    icon: Settings,
    items: [
      {
        title: 'Website',
        href: '/admin/settings/website',
      },
      {
        title: 'Email',
        href: '/admin/settings/email',
      },
      {
        title: 'Backup',
        href: '/admin/settings/backup',
      },
    ],
  },
];
