import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/api';

interface LoginCredentials {
  username: string;
  password: string;
  role: 'warga' | 'majelis' | 'admin';
}

interface User {
  role: 'warga' | 'majelis' | 'admin';
  username: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const isAuthenticated = Boolean(user);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await auth.login(credentials);
      const userData = {
        role: credentials.role,
        username: credentials.username
      };
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      // Redirect based on role
      switch (credentials.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'majelis':
          navigate('/dashboard');
          break;
        case 'warga':
          navigate('/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await auth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      navigate('/auth/login');
    }
  }, [navigate]);

  return {
    login,
    logout,
    isLoading,
    error,
    user,
    isAuthenticated
  };
};
