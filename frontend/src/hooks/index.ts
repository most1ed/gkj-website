import { useState, useCallback } from 'react';
import { mockApi } from '@/lib/mock';
import { 
  ServiceData, 
  Announcement, 
  Devotional 
} from '@/types/services';
import { BaseEntity } from '@/types/common';
import { useToast } from './useToast';

// Centralized error logging and tracking
export const logError = (context: string, error: unknown) => {
  console.error(`[${context}] Error:`, error);
  // Future: Integrate with error tracking service like Sentry
};

// Generic data fetching hook with advanced error handling
export function useDataFetch<T extends BaseEntity>(
  key: string, 
  fetchFn: () => Promise<T>, 
  config = { 
    initialData: {} as T, 
    errorProbability: 0.1 
  }
) {
  const [data, setData] = useState<T>(config.initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Use mock API call simulation
      const result = await mockApi.utils.simulateApiCall(
        fetchFn,
        { 
          delay: true, 
          errorProbability: config.errorProbability 
        }
      );

      setData(result);
      setError(null);
    } catch (err) {
      // Log and handle errors
      const mockError = mockApi.errors.createMockApiError(
        mockApi.errors.MockApiErrorType.SERVER_ERROR, 
        err instanceof Error ? err.message : 'Unknown error'
      );
      
      mockApi.errors.MockApiErrorLogger.log(mockError);
      setError(mockError);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, config.errorProbability]);

  return { 
    data, 
    loading, 
    error, 
    refetch: fetchData 
  };
}

// Specific data hooks with strong typing
export const useServicesData = () => useDataFetch<ServiceData>(
  'services', 
  async () => ({
    upcomingServices: mockApi.services.generateUpcomingServices(2),
    weeklyServices: mockApi.services.generateWeeklyServices(2)
  })
);

export const useAnnouncementsData = () => useDataFetch<Announcement[]>(
  'announcements', 
  async () => mockApi.services.generateAnnouncements(5)
);

export const useDevotionalsData = () => useDataFetch<Devotional[]>(
  'devotionals', 
  async () => mockApi.services.generateDevotionals(2)
);

// Global unhandled promise rejection handler
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    logError('Unhandled Promise Rejection', event.reason);
  });
}

// Export other hooks
export { useToast } from './useToast';
export { useAuth } from './auth';
