// Base interfaces for consistent data modeling
export interface BaseEntity {
  id: string;
  title: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  status: FetchStatus;
  error?: string;
}

export interface UserRole {
  id: string;
  name: 'admin' | 'member' | 'guest' | 'leader';
  permissions: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
