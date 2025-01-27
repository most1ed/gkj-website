import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/api';

interface DailyReading {
  id: string;
  date: Date;
  title: string;
  verses: string;
  description: string;
}

export function useAlkitabData() {
  const queryClient = useQueryClient();

  // Fetch daily readings
  const { data, isLoading, error } = useQuery<DailyReading[]>({
    queryKey: ['daily-readings'],
    queryFn: async () => {
      const response = await api.get('/api/alkitab/daily-readings');
      return response.data;
    }
  });

  // Add daily reading
  const addReading = useMutation({
    mutationFn: async (reading: Omit<DailyReading, 'id'>) => {
      const response = await api.post('/api/alkitab/daily-readings', reading);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-readings'] });
    }
  });

  // Update daily reading
  const updateReading = useMutation({
    mutationFn: async ({ id, ...data }: DailyReading) => {
      const response = await api.put(`/api/alkitab/daily-readings/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-readings'] });
    }
  });

  // Delete daily reading
  const deleteReading = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/api/alkitab/daily-readings/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-readings'] });
    }
  });

  return {
    data,
    isLoading,
    error,
    addReading,
    updateReading,
    deleteReading
  };
}
