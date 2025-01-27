// Mock API for development
interface LoginCredentials {
  username: string;
  password: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: {
    username: string;
    role: string;
  };
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  post: async (url: string, data: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url === '/auth/login') {
      // Mock successful login
      return {
        data: {
          token: 'mock-jwt-token',
          user: {
            username: data.username,
            role: data.role
          }
        }
      };
    } else if (url === '/auth/logout') {
      // Just clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { data: {} };
    } else if (url === '/auth/me') {
      // Get user from localStorage
      const user = localStorage.getItem('user');
      if (!user) {
        throw new Error('No user found');
      }
      
      return { data: JSON.parse(user) };
    }
  },
};

// Add request interceptor to include auth token
api.interceptors = {
  request: {
    use: (config: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  }
};

// Add response interceptor to handle errors
api.interceptors.response = {
  use: (
    response: any,
    error: any
  ) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
};

export const auth = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: async () => {
    const response = await api.post('/auth/me');
    return response.data;
  },
};
