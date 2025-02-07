import axios from 'axios';

// Define API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Base configuration for API calls
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptors for request and response handling
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.params);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    // Detailed error logging
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('[API Error Response]', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });

      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access Forbidden');
          break;
        case 404:
          console.error('Resource Not Found');
          break;
        case 500:
          console.error('Server Error');
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('[API No Response Error]', error.request);
    } else {
      // Something happened in setting up the request
      console.error('[API Setup Error]', error.message);
    }

    return Promise.reject(error);
  }
);

// Specific API methods
export const apiMethods = {
  // Generic GET method
  get: async (url: string, params?: any) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      console.error(`GET request to ${url} failed:`, error);
      throw error;
    }
  },

  // Generic POST method
  post: async (url: string, data: any) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      console.error(`POST request to ${url} failed:`, error);
      throw error;
    }
  },

  // Specific method for pengaturan
  getPengaturan: async () => {
    return apiMethods.get('/pengaturan');
  }
};

export default api;
