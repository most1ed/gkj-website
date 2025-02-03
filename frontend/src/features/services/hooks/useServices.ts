import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { z } from 'zod';
import { fetcher } from '@/lib/api/fetcher';
import { ApiError } from '@/lib/api/fetcher';

// Zod schema for service validation
export const ServiceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Service name is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().default(true)
});

export type Service = z.infer<typeof ServiceSchema>;

// Fetch services with advanced type safety and error handling
export function useServices(
  options: UseQueryOptions<Service[], ApiError> = {}
) {
  return useQuery<Service[], ApiError>({
    queryKey: ['services'],
    queryFn: async () => {
      const data = await fetcher.get('/services');
      
      // Validate and parse the response
      const parsedServices = z.array(ServiceSchema).parse(data);
      return parsedServices;
    },
    // Merge default options with user-provided options
    ...options,
    
    // Retry configuration
    retry: (failureCount, error) => {
      // Custom retry logic
      if (error instanceof ApiError && 
          (error.status === 401 || error.status === 403)) {
        return false; // Don't retry authentication errors
      }
      return failureCount < 3; // Retry up to 3 times for other errors
    },
    
    // Stale and cache times
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
}

// Fetch a single service by ID
export function useService(
  serviceId: string, 
  options: UseQueryOptions<Service, ApiError> = {}
) {
  return useQuery<Service, ApiError>({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const data = await fetcher.get(`/services/${serviceId}`);
      
      // Validate and parse the response
      const parsedService = ServiceSchema.parse(data);
      return parsedService;
    },
    // Merge default options with user-provided options
    ...options,
    
    // Retry configuration
    retry: (failureCount, error) => {
      // Custom retry logic
      if (error instanceof ApiError && 
          (error.status === 401 || error.status === 403)) {
        return false; // Don't retry authentication errors
      }
      return failureCount < 3; // Retry up to 3 times for other errors
    },
    
    // Stale and cache times
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
}

// Individual service fetching hook
export function useService(
  serviceId: string, 
  options: UseQueryOptions<Service, Error> = {}
) {
  return useQuery({
    queryKey: createQueryKey('service', { id: serviceId }),
    queryFn: () => fetcher(`/services/${serviceId}`, ServiceSchema),
    enabled: !!serviceId,
    ...options
  });
}

// Service mutations (create, update, delete)
export function useCreateService() {
  // Implement service creation mutation
}

export function useUpdateService() {
  // Implement service update mutation
}

export function useDeleteService() {
  // Implement service deletion mutation
}
