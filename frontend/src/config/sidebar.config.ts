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
  Settings,
  ClipboardList,
  UserCircle,
  UsersRound,
  ScrollText,
  Building2,
  PieChart,
  BarChart3,
  FileBarChart,
  Building,
  Network
} from 'lucide-react';

export type MenuItem = {
  title: string;
  href: string;
  icon: any;
  children?: MenuItem[];
};

export const sidebarConfig = {
  // Menu untuk semua role
  baseMenu: [
    {
      title: 'Dashboard',
      href: '/panel/flexdash',
      icon: Home
    }
  ],

  // Menu untuk Warga
  wargaMenu: [
    {
      title: 'Profil & Layanan',
      href: '/panel/profile',
      icon: UserCircle,
      children: [
        {
          title: 'Data Pribadi',
          href: '/panel/profile/personal',
          icon: User
        },
        {
          title: 'Data Keluarga',
          href: '/panel/profile/family',
          icon: Users
        },
        {
          title: 'Dokumen Saya',
          href: '/panel/profile/documents',
          icon: FileText
        },
        {
          title: 'Persembahan Saya',
          href: '/panel/profile/offerings',
          icon: DollarSign
        }
      ]
    }
  ],

  // Menu untuk Majelis
  majelisMenu: [
    {
      title: 'Sekretariat',
      href: '/panel/sekretariat',
      icon: ClipboardList,
      children: [
        {
          title: 'Data Jemaat',
          href: '/panel/sekretariat/jemaat',
          icon: UsersRound
        },
        {
          title: 'Data Keluarga',
          href: '/panel/sekretariat/keluarga',
          icon: Users
        },
        {
          title: 'Mutasi Jemaat',
          href: '/panel/sekretariat/mutasi',
          icon: ScrollText
        },
        {
          title: 'Baptis & Sidi',
          href: '/panel/sekretariat/sakramen',
          icon: Church
        }
      ]
    },
    {
      title: 'Ibadah & Pelayanan',
      href: '/panel/pelayanan',
      icon: HeartHandshake,
      children: [
        {
          title: 'Jadwal Ibadah',
          href: '/panel/pelayanan/jadwal-ibadah',
          icon: Calendar
        },
        {
          title: 'Presensi Ibadah',
          href: '/panel/pelayanan/presensi',
          icon: ClipboardList
        },
        {
          title: 'Tim Pelayanan',
          href: '/panel/pelayanan/tim',
          icon: Users
        },
        {
          title: 'Jadwal Pelayanan',
          href: '/panel/pelayanan/jadwal',
          icon: Calendar
        }
      ]
    },
    {
      title: 'Keuangan',
      href: '/panel/keuangan',
      icon: Wallet,
      children: [
        {
          title: 'Input Persembahan',
          href: '/panel/keuangan/persembahan',
          icon: DollarSign
        },
        {
          title: 'Kas Operasional',
          href: '/panel/keuangan/kas',
          icon: Wallet
        },
        {
          title: 'Laporan Mingguan',
          href: '/panel/keuangan/laporan/mingguan',
          icon: BarChart3
        },
        {
          title: 'Laporan Bulanan',
          href: '/panel/keuangan/laporan/bulanan',
          icon: PieChart
        }
      ]
    }
  ],

  // Menu untuk Admin
  adminMenu: [
    {
      title: 'Dashboard',
      href: '/panel/flexdash',
      icon: Home,
      children: [
        {
          title: 'Flex Dashboard',
          href: '/panel/flexdash',
          icon: PieChart
        }
      ]
    },
    {
      title: 'Manajemen Konten',
      href: '/panel/konten',
      icon: Layout,
      children: [
        {
          title: 'Artikel & Berita',
          href: '/panel/konten/artikel',
          icon: FileEdit
        },
        {
          title: 'Media & Galeri',
          href: '/panel/konten/media',
          icon: Image
        },
        {
          title: 'Warta Jemaat',
          href: '/panel/konten/warta',
          icon: ScrollText
        },
        {
          title: 'Renungan',
          href: '/panel/konten/renungan',
          icon: Book
        }
      ]
    },
    {
      title: 'Anggaran',
      href: '/panel/anggaran',
      icon: FileBarChart,
      children: [
        {
          title: 'Perencanaan',
          href: '/panel/anggaran/perencanaan',
          icon: PieChart
        },
        {
          title: 'Realisasi',
          href: '/panel/anggaran/realisasi',
          icon: BarChart3
        },
        {
          title: 'Evaluasi',
          href: '/panel/anggaran/evaluasi',
          icon: FileBarChart
        },
        {
          title: 'Laporan Tahunan',
          href: '/panel/anggaran/laporan',
          icon: FileBarChart
        }
      ]
    },
    {
      title: 'Master & Pengaturan',
      href: '/panel/pengaturan',
      icon: Settings,
      children: [
        {
          title: 'Data Gereja',
          href: '/panel/pengaturan/gereja',
          icon: Building
        },
        {
          title: 'Struktur Organisasi',
          href: '/panel/pengaturan/organisasi',
          icon: Network
        },
        {
          title: 'Manajemen User',
          href: '/panel/pengaturan/users',
          icon: Users
        },
        {
          title: 'Role & Permissions',
          href: '/panel/pengaturan/roles',
          icon: Database
        }
      ]
    }
  ]
};
