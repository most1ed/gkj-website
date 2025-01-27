import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "majelis" | "user";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
