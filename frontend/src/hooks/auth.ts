import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockApi } from '@/lib/mock';
import { BaseEntity } from '@/types/common';

// Enhanced user type with more comprehensive details
export interface User extends BaseEntity {
  username: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  profile?: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

// Authentication store with enhanced error handling
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: { 
    username: string; 
    password: string 
  }) => Promise<User>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User>;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          // Use mock API with error simulation
          const result = await mockApi.utils.simulateApiCall(
            () => mockApi.testing.scenarios.successScenario(
              () => ({
                id: mockApi.testing.mockGenerators.user().id,
                username: credentials.username,
                email: mockApi.testing.mockGenerators.user().email,
                role: 'member',
                profile: {
                  firstName: 'John',
                  lastName: 'Doe',
                  avatar: 'https://example.com/avatar.jpg'
                }
              })
            )(),
            { 
              delay: true, 
              errorProbability: 0.1 
            }
          );

          set({
            user: result,
            token: mockApi.testing.mockGenerators.user().id,
            isAuthenticated: true
          });

          return result;
        } catch (error) {
          // Log and handle authentication errors
          if (error instanceof Error) {
            mockApi.errors.MockApiErrorLogger.log(
              mockApi.errors.createMockApiError(
                mockApi.errors.MockApiErrorType.UNAUTHORIZED, 
                error.message
              )
            );
          }
          throw error;
        }
      },

      logout: async () => {
        try {
          // Simulate logout with potential errors
          await mockApi.utils.simulateApiCall(
            () => {
              set({ 
                user: null, 
                token: null, 
                isAuthenticated: false 
              });
              return true;
            },
            { 
              delay: true, 
              errorProbability: 0.05 
            }
          );
        } catch (error) {
          // Handle logout errors
          if (error instanceof Error) {
            mockApi.errors.MockApiErrorLogger.log(
              mockApi.errors.createMockApiError(
                mockApi.errors.MockApiErrorType.SERVER_ERROR, 
                'Logout failed'
              )
            );
          }
          throw error;
        }
      },

      getCurrentUser: async () => {
        try {
          // Use retry mechanism for getting current user
          return await mockApi.utils.retryApiCall(
            async () => {
              const user = await mockApi.utils.simulateApiCall(
                () => mockApi.testing.mockGenerators.user(),
                { 
                  delay: true, 
                  errorProbability: 0.2 
                }
              );
              
              set({ 
                user, 
                isAuthenticated: !!user 
              });
              
              return user;
            },
            { 
              maxRetries: 3, 
              baseDelay: 500 
            }
          );
        } catch (error) {
          // Handle user retrieval errors
          if (error instanceof Error) {
            mockApi.errors.MockApiErrorLogger.log(
              mockApi.errors.createMockApiError(
                mockApi.errors.MockApiErrorType.NOT_FOUND, 
                'Unable to retrieve user'
              )
            );
          }
          
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
          });
          
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
