export type Role = 'admin' | 'majelis' | 'user';

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  name: string;
  noAnggota?: string;
  wilayah?: string;
  status: 'active' | 'inactive';
  permissions: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
