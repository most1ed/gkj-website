import React from 'react';
import { 
  QueryClient, 
  QueryClientProvider,
  QueryCache,
  MutationCache,
  QueryObserverOptions
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ApiError } from '@/lib/api/fetcher';
import { toast } from '@/components/ui/use-toast';

// Centralized error handler
function handleQueryError(error: unknown) {
  const apiError = error as ApiError;

  console.error('Query Error:', apiError);

  // Specific error handling based on error type
  switch (apiError.status) {
    case 401:
      toast({
        title: 'Unauthorized',
        description: 'Please log in again.',
        variant: 'destructive'
      });
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
      break;
    case 403:
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access this resource.',
        variant: 'destructive'
      });
      break;
    case 404:
      toast({
        title: 'Not Found',
        description: 'The requested resource could not be found.',
        variant: 'destructive'
      });
      break;
    case 422:
      toast({
        title: 'Validation Error',
        description: 'Please check your input.',
        variant: 'destructive'
      });
      break;
    case 500:
      toast({
        title: 'Server Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive'
      });
      break;
    default:
      toast({
        title: 'Error',
        description: apiError.message || 'An unknown error occurred.',
        variant: 'destructive'
      });
  }
}

// Create a query client with advanced configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const apiError = error as ApiError;
        // Retry only for certain types of errors
        const retryableStatusCodes = [500, 502, 503, 504];
        return failureCount < 3 && retryableStatusCodes.includes(apiError.status || 0);
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: handleQueryError
    },
    mutations: {
      onError: handleQueryError
    }
  },
  queryCache: new QueryCache({
    onError: handleQueryError
  }),
  mutationCache: new MutationCache({
    onError: handleQueryError
  })
});

// Query provider wrapper with DevTools
export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

// Utility hook for consistent error handling
export function useQueryErrorHandler() {
  return handleQueryError;
}
