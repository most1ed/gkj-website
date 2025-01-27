import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, AuthResponse, AuthContextType } from '@/lib/auth/types';
import { api } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'majelis' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'gkj_auth';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    if (savedAuth) {
      const { user, token } = JSON.parse(savedAuth);
      setUser(user);
      setIsAuthenticated(true);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      const { user, token } = response.data;

      // Save to local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
      
      // Set user in state
      setUser(user);
      
      // Set token in axios defaults
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
