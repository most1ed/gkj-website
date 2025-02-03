import { 
  FlexWidget, 
  WidgetCategory, 
  WidgetSize, 
  UserRole,
  PresetWidget,
  DashboardPreset
} from '../types/dashboard.types';

import { 
  FinancialOverviewWidget,
  MembershipStatsWidget,
  EventCalendarWidget,
  MinistryProgressWidget
} from '../widgets/predefinedWidgets';

export class WidgetManager {
  // Predefined widget presets for different roles
  static getDashboardPresets(): DashboardPreset[] {
    return [
      {
        name: 'Admin Dashboard',
        role: UserRole.ADMIN,
        widgets: [
          {
            category: WidgetCategory.OVERVIEW,
            defaultWidgets: [
              {
                ...FinancialOverviewWidget,
                size: WidgetSize.LARGE,
                allowedRoles: [UserRole.ADMIN, UserRole.TREASURER]
              },
              {
                ...MembershipStatsWidget,
                size: WidgetSize.MEDIUM,
                allowedRoles: [UserRole.ADMIN, UserRole.STAFF]
              }
            ]
          },
          {
            category: WidgetCategory.EVENTS,
            defaultWidgets: [
              {
                ...EventCalendarWidget,
                size: WidgetSize.MEDIUM,
                allowedRoles: [UserRole.ADMIN, UserRole.STAFF]
              }
            ]
          }
        ]
      },
      {
        name: 'Staff Dashboard',
        role: UserRole.STAFF,
        widgets: [
          {
            category: WidgetCategory.MEMBERSHIP,
            defaultWidgets: [
              {
                ...MembershipStatsWidget,
                size: WidgetSize.LARGE,
                allowedRoles: [UserRole.STAFF]
              }
            ]
          },
          {
            category: WidgetCategory.MINISTRY,
            defaultWidgets: [
              {
                ...MinistryProgressWidget,
                size: WidgetSize.MEDIUM,
                allowedRoles: [UserRole.STAFF, UserRole.MINISTRY_LEADER]
              }
            ]
          }
        ]
      }
      // Add more presets for other roles
    ];
  }

  // Get preset widgets for a specific role
  static getPresetWidgetsForRole(role: UserRole): FlexWidget[] {
    const preset = this.getDashboardPresets().find(p => p.role === role);
    return preset 
      ? preset.widgets.flatMap(category => category.defaultWidgets)
      : [];
  }

  // Validate widget configuration
  static validateWidget(widget: FlexWidget): boolean {
    return !!(
      widget.id && 
      widget.title && 
      widget.category && 
      widget.component && 
      widget.allowedRoles.length > 0
    );
  }

  // Generate default widget configuration
  static createDefaultWidget(
    category: WidgetCategory, 
    role: UserRole
  ): FlexWidget | null {
    const presetWidgets = this.getPresetWidgetsForRole(role);
    const matchingWidgets = presetWidgets.filter(w => w.category === category);
    
    return matchingWidgets.length > 0 
      ? matchingWidgets[0] 
      : null;
  }
}
