import { useState, useCallback } from 'react';
import { useQuery, UseMutationOptions, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { fetcher, ApiError } from '@/lib/api/fetcher';
import { toast } from '@/components/ui/use-toast';

// Generic API hook for fetching data
export function useApi<T extends z.ZodTypeAny>(
  url: string, 
  schema: T, 
  options: {
    enabled?: boolean;
    onSuccess?: (data: z.infer<T>) => void;
    onError?: (error: ApiError) => void;
  } = {}
) {
  return useQuery<z.infer<T>, ApiError>({
    queryKey: [url],
    queryFn: () => fetcher.get(url, schema),
    ...options,
    onError: (error) => {
      toast({
        title: 'Fetch Error',
        description: error.message,
        variant: 'destructive'
      });
      options.onError?.(error);
    }
  });
}

// Generic mutation hook for creating/updating data
export function useApiMutation<
  TData extends z.ZodTypeAny, 
  TVariables = any
>(
  url: string, 
  schema: TData,
  method: 'post' | 'put' = 'post',
  options: UseMutationOptions<z.infer<TData>, ApiError, TVariables> = {}
) {
  return useMutation<z.infer<TData>, ApiError, TVariables>({
    mutationFn: (data) => 
      method === 'post' 
        ? fetcher.post(url, data, schema) 
        : fetcher.put(url, data, schema),
    ...options,
    onError: (error) => {
      toast({
        title: 'Mutation Error',
        description: error.message,
        variant: 'destructive'
      });
      options.onError?.(error);
    }
  });
}

// Utility hook for manual data fetching with loading state
export function useManualFetch<T extends z.ZodTypeAny>(
  url: string, 
  schema: T
) {
  const [data, setData] = useState<z.infer<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher.get(url, schema);
      setData(result);
      return result;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      toast({
        title: 'Fetch Error',
        description: apiError.message,
        variant: 'destructive'
      });
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [url, schema]);

  return { data, loading, error, fetchData };
}
