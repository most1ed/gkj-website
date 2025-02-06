import { ROLES } from "@/features/auth/constants/roles";
import {
  HomeIcon,
  UsersIcon,
  ChurchIcon,
  CalendarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CogIcon,
  NewspaperIcon,
  PhotoIcon,
  BookOpen,
  ChartPieIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';

export interface MenuItem {
  label: string;
  path: string;
  icon?: any;
  roles: string[];
  children?: MenuItem[];
}

export const menuConfig: MenuItem[] = [
  // Dashboard untuk semua user
  {
    label: "Dashboard",
    path: "/panel/dashboard",
    icon: HomeIcon,
    roles: [ROLES.USER],
  },

  // Menu Profil & Layanan Jemaat
  {
    label: "Profil & Layanan",
    path: "/panel/profile",
    icon: UsersIcon,
    roles: [ROLES.USER],
    children: [
      {
        label: "Data Pribadi",
        path: "/panel/profile/personal",
        roles: [ROLES.USER],
      },
      {
        label: "Data Keluarga",
        path: "/panel/profile/family",
        roles: [ROLES.USER],
      },
      {
        label: "Dokumen Saya",
        path: "/panel/documents",
        roles: [ROLES.USER],
      },
      {
        label: "Persembahan Saya",
        path: "/panel/offerings",
        roles: [ROLES.USER],
      },
    ],
  },

  // Menu Sekretariat
  {
    label: "Sekretariat",
    path: "/panel/sekretariat",
    icon: BuildingOfficeIcon,
    roles: [ROLES.SEKRETARIAT, ROLES.MAJELIS],
    children: [
      {
        label: "Data Jemaat",
        path: "/panel/jemaat/data",
        roles: [ROLES.SEKRETARIAT, ROLES.MAJELIS],
      },
      {
        label: "Data Keluarga",
        path: "/panel/jemaat/family",
        roles: [ROLES.SEKRETARIAT, ROLES.MAJELIS],
      },
      {
        label: "Mutasi Jemaat",
        path: "/panel/jemaat/mutation",
        roles: [ROLES.SEKRETARIAT],
      },
      {
        label: "Baptis & Sidi",
        path: "/panel/jemaat/sacrament",
        roles: [ROLES.SEKRETARIAT],
      },
    ],
  },

  // Menu Ibadah & Pelayanan
  {
    label: "Ibadah & Pelayanan",
    path: "/panel/ministry",
    icon: ChurchIcon,
    roles: [ROLES.MAJELIS, ROLES.PELAYANAN],
    children: [
      {
        label: "Jadwal Ibadah",
        path: "/panel/ibadah/schedule",
        roles: [ROLES.MAJELIS, ROLES.PELAYANAN],
      },
      {
        label: "Presensi Ibadah",
        path: "/panel/ibadah/attendance",
        roles: [ROLES.MAJELIS, ROLES.PELAYANAN],
      },
      {
        label: "Tim Pelayanan",
        path: "/panel/pelayanan/teams",
        roles: [ROLES.MAJELIS, ROLES.PELAYANAN],
      },
      {
        label: "Jadwal Pelayanan",
        path: "/panel/pelayanan/schedule",
        roles: [ROLES.MAJELIS, ROLES.PELAYANAN],
      },
    ],
  },

  // Menu Keuangan Operasional (Bendahara)
  {
    label: "Keuangan",
    path: "/panel/keuangan-operasional",
    icon: CurrencyDollarIcon,
    roles: [ROLES.BENDAHARA],
    children: [
      {
        label: "Input Persembahan",
        path: "/panel/keuangan-operasional/offerings/input",
        roles: [ROLES.BENDAHARA],
      },
      {
        label: "Kas Operasional",
        path: "/panel/keuangan-operasional/cash",
        roles: [ROLES.BENDAHARA],
      },
      {
        label: "Laporan Mingguan",
        path: "/panel/keuangan-operasional/reports/weekly",
        roles: [ROLES.BENDAHARA],
      },
      {
        label: "Laporan Bulanan",
        path: "/panel/keuangan-operasional/reports/monthly",
        roles: [ROLES.BENDAHARA],
      },
    ],
  },

  // Menu Admin Konten
  {
    label: "Manajemen Konten",
    path: "/panel/admin/content",
    icon: NewspaperIcon,
    roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    children: [
      {
        label: "Artikel & Berita",
        path: "/panel/admin/artikel",
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
      {
        label: "Media & Galeri",
        path: "/panel/admin/media",
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
      {
        label: "Warta Jemaat",
        path: "/panel/admin/warta",
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
      {
        label: "Renungan",
        path: "/panel/admin/alkitab",
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
    ],
  },

  // Menu Anggaran
  {
    label: "Anggaran",
    path: "/panel/admin/anggaran",
    icon: CalculatorIcon,
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    children: [
      {
        label: "Perencanaan Anggaran",
        path: "/panel/admin/anggaran/planning",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
      {
        label: "Realisasi Anggaran",
        path: "/panel/admin/anggaran/realization",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
      {
        label: "Evaluasi Anggaran",
        path: "/panel/admin/anggaran/evaluation",
        roles: [ROLES.SUPER_ADMIN],
      },
      {
        label: "Laporan Tahunan",
        path: "/panel/admin/anggaran/annual-report",
        roles: [ROLES.SUPER_ADMIN],
      },
    ],
  },

  // Menu Master Data & Pengaturan
  {
    label: "Master & Pengaturan",
    path: "/panel/admin/settings",
    icon: CogIcon,
    roles: [ROLES.SUPER_ADMIN],
    children: [
      {
        label: "Data Gereja",
        path: "/panel/admin/master/church",
        roles: [ROLES.SUPER_ADMIN],
      },
      {
        label: "Struktur Organisasi",
        path: "/panel/admin/master/organization",
        roles: [ROLES.SUPER_ADMIN],
      },
      {
        label: "Manajemen User",
        path: "/panel/admin/settings/users",
        roles: [ROLES.SUPER_ADMIN],
      },
      {
        label: "Role & Permissions",
        path: "/panel/admin/settings/roles",
        roles: [ROLES.SUPER_ADMIN],
      },
    ],
  },
];
