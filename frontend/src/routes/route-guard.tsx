import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole } from './types';
import { useAuth } from '@/hooks/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export function RouteGuard({ 
  children, 
  requiredRoles = [], 
  fallback = <LoadingSpinner /> 
}: RouteGuardProps) {
  const { user, isAuthenticated } = useAuth();

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role mapping
  const roleMap: Record<string, UserRole> = {
    'admin': UserRole.ADMIN,
    'member': UserRole.WARGA,
    'guest': UserRole.GUEST
  };

  // Role-based access control
  if (requiredRoles.length > 0 && 
      !requiredRoles.includes(roleMap[user?.role || 'guest'])) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

// Higher-order component for route protection
export function withRouteGuard<P = {}>(
  Component: React.ComponentType<P>, 
  requiredRoles?: UserRole[]
) {
  return (props: P) => (
    <RouteGuard requiredRoles={requiredRoles}>
      <Component {...props} />
    </RouteGuard>
  );
}
