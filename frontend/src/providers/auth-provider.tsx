import React, { createContext, ReactNode } from 'react';
import { useAuth as useAuthHook } from '@/hooks/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authStore = useAuthHook();

  return (
    <AuthContext.Provider value={authStore}>
      {children}
    </AuthContext.Provider>
  );
}

// Fallback hook in case someone tries to use the old provider
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
