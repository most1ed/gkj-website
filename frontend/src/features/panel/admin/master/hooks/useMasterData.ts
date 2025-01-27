import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface Council {
  id: string;
  name: string;
  position: string;
  period: string;
  status: 'active' | 'inactive';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'majelis' | 'user';
  status: 'active' | 'inactive';
}

interface MasterData {
  councils: Council[];
  users: User[];
}

export function useMasterData() {
  const queryClient = useQueryClient();

  // Fetch master data
  const { data, isLoading, error } = useQuery<MasterData>({
    queryKey: ['master'],
    queryFn: async () => {
      const response = await api.get('/api/master');
      return response.data;
    }
  });

  // Add council
  const addCouncil = useMutation({
    mutationFn: async (council: Omit<Council, 'id'>) => {
      const response = await api.post('/api/master/councils', council);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master'] });
    }
  });

  // Update council
  const updateCouncil = useMutation({
    mutationFn: async ({ id, ...data }: Council) => {
      const response = await api.put(`/api/master/councils/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master'] });
    }
  });

  // Delete council
  const deleteCouncil = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/api/master/councils/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master'] });
    }
  });

  // Add user
  const addUser = useMutation({
    mutationFn: async (user: Omit<User, 'id'>) => {
      const response = await api.post('/api/master/users', user);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master'] });
    }
  });

  // Update user
  const updateUser = useMutation({
    mutationFn: async ({ id, ...data }: User) => {
      const response = await api.put(`/api/master/users/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master'] });
    }
  });

  // Delete user
  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/api/master/users/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master'] });
    }
  });

  return {
    data,
    isLoading,
    error,
    addCouncil,
    updateCouncil,
    deleteCouncil,
    addUser,
    updateUser,
    deleteUser
  };
}
