import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios';
import { z } from 'zod';

// Base API configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Custom error class for API errors
export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: any;

  constructor(
    message: string, 
    status?: number, 
    code?: string, 
    details?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// API client with interceptors
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000, // 10 seconds
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for adding auth token
    this.client.interceptors.request.use(
      config => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      this.handleError
    );
  }

  private handleError = (error: AxiosError): never => {
    if (error.response) {
      // Server responded with an error status
      const { status, data } = error.response;
      throw new ApiError(
        data?.message || 'An unexpected error occurred',
        status,
        data?.code,
        data?.details
      );
    } else if (error.request) {
      // Request made but no response received
      throw new ApiError(
        'No response received from server', 
        500, 
        'NETWORK_ERROR'
      );
    } else {
      // Error in setting up the request
      throw new ApiError(
        error.message || 'Error setting up request', 
        500, 
        'REQUEST_ERROR'
      );
    }
  }

  // Generic method for GET requests with Zod validation
  async get<T extends z.ZodTypeAny>(
    url: string, 
    schema: T, 
    config: AxiosRequestConfig = {}
  ): Promise<z.infer<T>> {
    try {
      const response = await this.client.get(url, config);
      return this.validateResponse(response, schema);
    } catch (error) {
      this.logError('GET', url, error);
      throw error;
    }
  }

  // Generic method for POST requests with Zod validation
  async post<T extends z.ZodTypeAny>(
    url: string, 
    data: any, 
    schema: T, 
    config: AxiosRequestConfig = {}
  ): Promise<z.infer<T>> {
    try {
      const response = await this.client.post(url, data, config);
      return this.validateResponse(response, schema);
    } catch (error) {
      this.logError('POST', url, error);
      throw error;
    }
  }

  // Generic method for PUT requests with Zod validation
  async put<T extends z.ZodTypeAny>(
    url: string, 
    data: any, 
    schema: T, 
    config: AxiosRequestConfig = {}
  ): Promise<z.infer<T>> {
    try {
      const response = await this.client.put(url, data, config);
      return this.validateResponse(response, schema);
    } catch (error) {
      this.logError('PUT', url, error);
      throw error;
    }
  }

  // Generic method for DELETE requests
  async delete(
    url: string, 
    config: AxiosRequestConfig = {}
  ): Promise<void> {
    try {
      await this.client.delete(url, config);
    } catch (error) {
      this.logError('DELETE', url, error);
      throw error;
    }
  }

  // Validate response using Zod schema
  private validateResponse<T extends z.ZodTypeAny>(
    response: AxiosResponse, 
    schema: T
  ): z.infer<T> {
    try {
      return schema.parse(response.data);
    } catch (validationError) {
      throw new ApiError(
        'Invalid response data', 
        500, 
        'VALIDATION_ERROR',
        validationError
      );
    }
  }

  // Error logging method (can be extended to use Sentry or other logging)
  private logError(method: string, url: string, error: any) {
    console.error(`[API ${method}] ${url}:`, error);
    // Future: Integrate with error tracking service
  }
}

// Singleton instance of API client
export const fetcher = new ApiClient();
