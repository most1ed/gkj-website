import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

// Enum for user roles with clear permissions
export enum UserRole {
  ADMIN = "admin",
  STAFF = "majelis",
  USER = "user",
  TREASURER = "admin" // Mapping treasurer to admin for now
}

// Comprehensive route configuration type
export interface ExtendedRouteObject extends RouteObject {
  // Additional metadata for routes
  meta?: {
    title?: string;
    description?: string;
    roles?: UserRole[];
    icon?: ReactNode;
    hideInMenu?: boolean;
  };
  
  // Nested children with same extended type
  children?: ExtendedRouteObject[];
}

// Navigation item for menus and breadcrumbs
export interface NavigationItem {
  label: string;
  path: string;
  icon?: ReactNode;
  roles?: UserRole[];
  children?: NavigationItem[];
}

// Route permissions mapping
export const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  '/panel/dashboard': [UserRole.ADMIN, UserRole.STAFF],
  '/panel/services': [UserRole.ADMIN, UserRole.STAFF],
  '/panel/members': [UserRole.ADMIN, UserRole.STAFF],
  '/panel/events': [UserRole.USER, UserRole.STAFF, UserRole.ADMIN],
  '/panel/profile': [UserRole.USER, UserRole.STAFF, UserRole.ADMIN]
};

// Utility to check route access
export function canAccessRoute(
  route: string, 
  userRole: UserRole
): boolean {
  const requiredRoles = ROUTE_PERMISSIONS[route] || [];
  return requiredRoles.length === 0 || requiredRoles.includes(userRole);
}

export function generateNavigationMenu(userRole: UserRole): NavigationItem[] {
  const baseMenu: NavigationItem[] = [
    { 
      label: 'Dashboard', 
      path: '/panel/dashboard', 
      roles: [UserRole.ADMIN, UserRole.STAFF] 
    },
    { 
      label: 'Profile', 
      path: '/panel/profile', 
      roles: [UserRole.USER, UserRole.STAFF, UserRole.ADMIN] 
    }
  ];

  return baseMenu.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );
}
