import { useQuery } from '@tanstack/react-query';
import { apiMethods } from '@/lib/api';

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
  return useQuery({
    queryKey: ['pengaturan'],
    queryFn: async () => {
      try {
        return await apiMethods.getPengaturan();
      } catch (error) {
        console.error('Failed to fetch pengaturan data:', error);
        throw error;
      }
    },
    retry: 1
  });
}
