import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

interface PengaturanData {
  general: {
    siteName: string;
    description: string;
    address: string;
    phone: string;
    email: string;
  };
  email: {
    useSmtp: boolean;
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;
    fromEmail: string;
    fromName: string;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    httpsOnly: boolean;
    allowedIPs: string[];
  };
  backup: {
    autoBackup: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    backupTime: string;
    retentionPeriod: number;
    backupLocation: string;
    includeDatabase: boolean;
    includeFiles: boolean;
  };
}

export function usePengaturanData() {
  return useQuery<PengaturanData>({
    queryKey: ['pengaturan'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      const response = await api.get('/api/pengaturan');
      return response.data;
    }
  });
}
