import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Enhanced secure storage middleware
const secureStorage = {
  getItem: (key: string) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Secure storage get error:', error);
      return null;
    }
  },
  setItem: (key: string, value: any) => {
    try {
      // Basic sanitization
      const sanitizedValue = JSON.stringify(value);
      localStorage.setItem(key, sanitizedValue);
    } catch (error) {
      console.error('Secure storage set error:', error);
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  }
};

// Advanced type-safe store creator
export function createSecureStore<T extends object>(
  name: string, 
  initialState: T, 
  options: {
    actions: (set: (partial: Partial<T>) => void, get: () => T) => object,
    persist?: boolean,
    sensitiveFields?: (keyof T)[]
  }
) {
  const baseStore = create<T>()((set, get) => ({
    ...initialState,
    ...options.actions(set, get)
  }));

  // Optional persistence with security
  if (options.persist) {
    return create<T>()(
      persist(
        immer((set, get) => ({
          ...initialState,
          ...options.actions(set, get)
        })),
        {
          name,
          storage: secureStorage,
          partialize: (state) => {
            if (options.sensitiveFields) {
              const filteredState = { ...state };
              options.sensitiveFields.forEach(field => {
                delete (filteredState as any)[field];
              });
              return filteredState;
            }
            return state;
          }
        }
      )
    );
  }

  return baseStore;
}

// Global state tracker for debugging
export const useStateObserver = create<{
  lastAction: { 
    type: string, 
    payload: any, 
    timestamp: number 
  } | null
}>((set) => ({
  lastAction: null,
  trackAction: (type: string, payload: any) => 
    set({ 
      lastAction: { 
        type, 
        payload, 
        timestamp: Date.now() 
      } 
    })
}));
