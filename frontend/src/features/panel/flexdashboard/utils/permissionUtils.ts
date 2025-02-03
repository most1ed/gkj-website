import { Widget } from '../types/dashboard.types';

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'STAFF'
  | 'TREASURER'
  | 'MINISTRY_LEADER'
  | 'MEMBER';

export interface UserPermission {
  role: UserRole;
  permissions: string[];
}

export class PermissionManager {
  static canAccessWidget(
    userRole: UserRole, 
    widget: Widget
  ): boolean {
    // Default implementation - can be extended
    return widget.permissions.includes(userRole);
  }

  static filterWidgetsByRole(
    userRole: UserRole, 
    widgets: Widget[]
  ): Widget[] {
    return widgets.filter(widget => 
      this.canAccessWidget(userRole, widget)
    );
  }

  static hasPermission(
    user: UserPermission, 
    requiredPermission: string
  ): boolean {
    return user.permissions.includes(requiredPermission);
  }
}
