import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  BaseWidget, 
  WidgetCategory, 
  WidgetSize,
  WidgetTemplate,
  DashboardPreset,
  WidgetLayout 
} from '../types/widget.types';
import { UserRole } from '@/routes/types';
import { v4 as uuidv4 } from 'uuid';
import { 
  BaseWidget, 
  WidgetTemplate, 
  UserRole, 
  WidgetCategory, 
  CreateWidgetDTO 
} from '../types/widget.types';
import { widgetMock } from '@/lib/mock';

export class WidgetManager {
  // Predefined widget components
  static getWidgetComponents(): Record<string, () => React.ReactElement> {
    return {
      // Financial Overview Widget
      'financial-overview': () => {
        return React.createElement(Card, null, 
          React.createElement(CardHeader, null, 
            React.createElement(CardTitle, null, 'Financial Overview')
          ),
          React.createElement(CardContent, null,
            React.createElement('p', null, 'Total Contributions: Rp 500,000,000'),
            React.createElement('p', null, 'Monthly Budget: Rp 50,000,000')
          )
        );
      },

      // Membership Statistics Widget
      'membership-stats': () => {
        return React.createElement(Card, null, 
          React.createElement(CardHeader, null, 
            React.createElement(CardTitle, null, 'Membership Stats')
          ),
          React.createElement(CardContent, null,
            React.createElement('p', null, 'Total Members: 1,500'),
            React.createElement('p', null, 'New Members (This Month): 25')
          )
        );
      },

      // Event Calendar Widget
      'event-calendar': () => {
        return React.createElement(Card, null, 
          React.createElement(CardHeader, null, 
            React.createElement(CardTitle, null, 'Upcoming Events')
          ),
          React.createElement(CardContent, null,
            React.createElement('ul', null,
              React.createElement('li', null, 'Sunday Service - Every Sunday'),
              React.createElement('li', null, 'Youth Meeting - Next Saturday'),
              React.createElement('li', null, 'Annual Church Conference - 15 March')
            )
          )
        );
      },

      // Ministry Progress Widget
      'ministry-progress': () => {
        return React.createElement(Card, null, 
          React.createElement(CardHeader, null, 
            React.createElement(CardTitle, null, 'Ministry Progress')
          ),
          React.createElement(CardContent, null,
            React.createElement('p', null, 'Active Ministries: 5'),
            React.createElement('p', null, 'Ongoing Projects: 3')
          )
        );
      }
    };
  }

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
            id: 'financial-overview',
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
            id: 'event-calendar',
            title: 'Ringkasan Acara',
            description: 'Daftar dan detail acara gereja',
            category: WidgetCategory.EVENT,
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
  static async getWidgetsForRole(role: UserRole): Promise<BaseWidget[]> {
    return await widgetMock.getWidgetsByRole(role);
  }

  // Create a new widget
  static async createWidget(widgetData: CreateWidgetDTO): Promise<BaseWidget> {
    return await widgetMock.createWidget(widgetData);
  }

  // Update an existing widget
  static async updateWidget(widgetId: string, updates: Partial<BaseWidget>): Promise<BaseWidget> {
    return await widgetMock.updateWidget(widgetId, updates);
  }

  // Delete a widget
  static async deleteWidget(widgetId: string): Promise<boolean> {
    return await widgetMock.deleteWidget(widgetId);
  }

  // Generate widget layout dynamically
  static generateWidgetLayout(existingWidgets: BaseWidget[], newWidget: BaseWidget, maxColumns: number = 4): any {
    const existingCount = existingWidgets.length;

    // Calculate grid position
    const x = (existingCount % maxColumns) * 2;
    const y = Math.floor(existingCount / maxColumns) * 2;

    // Determine minimum size based on widget category
    const minSizes: Record<WidgetCategory, { w: number, h: number }> = {
      [WidgetCategory.FINANCIAL]: { w: 4, h: 3 },
      [WidgetCategory.MEMBER]: { w: 3, h: 2 },
      [WidgetCategory.MINISTRY]: { w: 4, h: 3 },
      [WidgetCategory.EVENT]: { w: 3, h: 2 },
      [WidgetCategory.ANNOUNCEMENT]: { w: 3, h: 2 },
      // Add more categories as needed
      DEFAULT: { w: 2, h: 2 }
    };

    const { w, h } = minSizes[newWidget.category] || minSizes.DEFAULT;

    return {
      x,
      y,
      w,
      h
    };
  }

  // Generate a unique widget ID
  static generateWidgetId(): string {
    return uuidv4();
  }
}
