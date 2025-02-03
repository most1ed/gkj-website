import { 
  BaseWidget, 
  WidgetCategory, 
  WidgetSize,
  WidgetTemplate,
  DashboardPreset 
} from '../types/widget.types';
import { UserRole } from '@/routes/types';

export class WidgetManager {
  // Predefined dashboard presets with more detailed templates
  static getDashboardPresets(): DashboardPreset[] {
    return [
      {
        role: UserRole.ADMIN,
        widgets: [
          {
            id: 'admin-overview',
            title: 'Admin Dashboard Overview',
            description: 'Ringkasan lengkap untuk administrator',
            category: WidgetCategory.OVERVIEW,
            content: 'Selamat datang di dashboard admin. Anda memiliki akses penuh ke semua fitur.',
            roles: [UserRole.ADMIN],
            size: WidgetSize.LARGE,
            icon: 'dashboard',
            isCustomizable: true
          },
          {
            id: 'financial-summary',
            title: 'Ringkasan Keuangan',
            description: 'Ikhtisar kondisi keuangan gereja',
            category: WidgetCategory.FINANCIAL,
            content: 'Total Kas: Rp 500,000,000 | Pengeluaran Bulan Ini: Rp 50,000,000',
            roles: [UserRole.ADMIN, UserRole.TREASURER],
            size: WidgetSize.MEDIUM,
            icon: 'dollar-sign',
            isCustomizable: true
          },
          {
            id: 'membership-stats',
            title: 'Statistik Keanggotaan',
            description: 'Informasi detail tentang anggota gereja',
            category: WidgetCategory.MEMBERSHIP,
            content: 'Total Anggota: 1,500 | Anggota Baru Bulan Ini: 25',
            roles: [UserRole.ADMIN, UserRole.STAFF],
            size: WidgetSize.MEDIUM,
            icon: 'users',
            isCustomizable: true
          }
        ]
      },
      {
        role: UserRole.STAFF,
        widgets: [
          {
            id: 'staff-overview',
            title: 'Staff Dashboard Overview',
            description: 'Ringkasan tugas dan informasi untuk staf',
            category: WidgetCategory.OVERVIEW,
            content: 'Selamat datang di dashboard staf. Anda memiliki akses terbatas.',
            roles: [UserRole.STAFF],
            size: WidgetSize.LARGE,
            icon: 'briefcase',
            isCustomizable: false
          },
          {
            id: 'events-summary',
            title: 'Ringkasan Acara',
            description: 'Daftar dan detail acara gereja',
            category: WidgetCategory.EVENTS,
            content: 'Acara Mendatang: Kebaktian Minggu | Pertemuan Pemuda | Konferensi Tahunan',
            roles: [UserRole.STAFF],
            size: WidgetSize.MEDIUM,
            icon: 'calendar',
            isCustomizable: true
          }
        ]
      },
      {
        role: UserRole.TREASURER,
        widgets: [
          {
            id: 'treasurer-overview',
            title: 'Dashboard Bendahara',
            description: 'Pusat informasi keuangan gereja',
            category: WidgetCategory.FINANCIAL,
            content: 'Fokus pada laporan keuangan dan transaksi.',
            roles: [UserRole.TREASURER],
            size: WidgetSize.LARGE,
            icon: 'credit-card',
            isCustomizable: true
          }
        ]
      }
    ];
  }

  // Get preset widgets for a specific role
  static getWidgetsForRole(role: UserRole): WidgetTemplate[] {
    const preset = this.getDashboardPresets().find(p => p.role === role);
    
    // Default widgets for all roles if no specific preset found
    const defaultWidgets: WidgetTemplate[] = [
      {
        id: 'general-overview',
        title: 'Ikhtisar Umum',
        description: 'Informasi dasar untuk semua pengguna',
        category: WidgetCategory.OVERVIEW,
        content: 'Selamat datang di dashboard GKJ',
        roles: Object.values(UserRole),
        size: WidgetSize.MEDIUM,
        icon: 'home',
        isCustomizable: true
      }
    ];

    return preset ? [...preset.widgets, ...defaultWidgets] : defaultWidgets;
  }

  // Get all available widget templates
  static getAllWidgetTemplates(): WidgetTemplate[] {
    return this.getDashboardPresets().flatMap(preset => preset.widgets);
  }

  // Utility method to get recommended size for a category
  static getRecommendedSize(category: WidgetCategory): WidgetSize {
    const sizeMap = {
      [WidgetCategory.OVERVIEW]: WidgetSize.LARGE,
      [WidgetCategory.FINANCIAL]: WidgetSize.MEDIUM,
      [WidgetCategory.MEMBERSHIP]: WidgetSize.MEDIUM,
      [WidgetCategory.EVENTS]: WidgetSize.SMALL,
      [WidgetCategory.MINISTRY]: WidgetSize.MEDIUM
    };

    return sizeMap[category] || WidgetSize.MEDIUM;
  }
}
