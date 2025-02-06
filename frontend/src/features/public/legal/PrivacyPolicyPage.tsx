import React from 'react';
import { 
  Lock, 
  User,
  Database,
  ShieldAlert
} from 'lucide-react';
import { PageTemplateGenerator } from '@/features/public/page-generator';
import { PageTemplate } from '@/features/public/page-generator/types';

export default function PrivacyPolicyPage() {
  const privacyTemplate: PageTemplate = {
    title: 'Kebijakan Privasi',
    metaTitle: 'Kebijakan Privasi - GKJ Grogol Jakarta',
    metaDescription: 'Kebijakan privasi dan perlindungan data pengguna website GKJ Grogol Jakarta',
    lastUpdated: 'Januari 2024',
    version: '1.1',
    sections: [
      {
        id: 'data-collection',
        title: 'Pengumpulan Data',
        icon: Database,
        description: 'Informasi tentang data yang kami kumpulkan.',
        details: [
          'Data pribadi yang diberikan secara sukarela',
          'Informasi kontak untuk pelayanan gereja',
          'Catatan interaksi dengan website',
          'Data statistik penggunaan website'
        ]
      },
      {
        id: 'data-usage',
        title: 'Penggunaan Data',
        icon: User,
        description: 'Cara kami menggunakan informasi pribadi Anda.',
        details: [
          'Komunikasi pelayanan gereja',
          'Pendaftaran kegiatan',
          'Pembaruan informasi gereja',
          'Peningkatan pengalaman pengguna'
        ]
      },
      {
        id: 'data-protection',
        title: 'Perlindungan Data',
        icon: Lock,
        description: 'Langkah-langkah keamanan data kami.',
        details: [
          'Enkripsi data sensitif',
          'Pembatasan akses data',
          'Penyimpanan aman',
          'Pemantauan keamanan berkala'
        ]
      },
      {
        id: 'user-rights',
        title: 'Hak Pengguna',
        icon: ShieldAlert,
        description: 'Hak Anda terkait data pribadi.',
        details: [
          'Hak akses data pribadi',
          'Permintaan penghapusan data',
          'Penarikan persetujuan',
          'Pengaduan dan pertanyaan privasi'
        ]
      }
    ]
  };

  return <PageTemplateGenerator template={privacyTemplate} />;
}
