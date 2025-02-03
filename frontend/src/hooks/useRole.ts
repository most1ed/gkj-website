import { useMemo } from 'react';
import { useAuth } from './auth';

export type UserRole = 'ADMIN' | 'MAJELIS' | 'WARGA' | 'GUEST';

export function useRole() {
  const { user } = useAuth();

  const rolePermissions = useMemo(() => {
    const defaultPermissions = {
      canViewDashboard: false,
      canManageServices: false,
      canManageUsers: false,
      canEditContent: false,
    };

    if (!user) return defaultPermissions;

    switch (user.role) {
      case 'ADMIN':
        return {
          ...defaultPermissions,
          canViewDashboard: true,
          canManageServices: true,
          canManageUsers: true,
          canEditContent: true,
        };
      case 'MAJELIS':
        return {
          ...defaultPermissions,
          canViewDashboard: true,
          canManageServices: true,
          canEditContent: true,
        };
      case 'WARGA':
        return {
          ...defaultPermissions,
          canViewDashboard: true,
        };
      case 'GUEST':
      default:
        return defaultPermissions;
    }
  }, [user]);

  return {
    role: user?.role as UserRole,
    permissions: rolePermissions,
    isAdmin: user?.role === 'ADMIN',
    isMajelis: user?.role === 'MAJELIS',
    isWarga: user?.role === 'WARGA',
    isGuest: user?.role === 'GUEST' || !user,
  };
}
