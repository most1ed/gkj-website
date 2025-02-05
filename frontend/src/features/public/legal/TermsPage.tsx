import React from 'react';
import { 
  DocumentTextIcon, 
  ShieldCheckIcon,
  LightBulbIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { PageTemplateGenerator } from '@/features/public/page-generator';
import { PageTemplate } from '@/features/public/page-generator/types';

export default function TermsPage() {
  const termsTemplate: PageTemplate = {
    title: 'Syarat & Ketentuan',
    metaTitle: 'Syarat & Ketentuan - GKJ Grogol Jakarta',
    metaDescription: 'Syarat dan ketentuan resmi penggunaan website GKJ Grogol Jakarta',
    lastUpdated: 'Januari 2024',
    version: '1.2',
    sections: [
      {
        id: 'usage-guidelines',
        title: 'Ketentuan Umum',
        icon: DocumentTextIcon,
        description: 'Panduan dasar penggunaan website GKJ Grogol Jakarta.',
        details: [
          'Persetujuan atas seluruh ketentuan',
          'Kewajiban mematuhi aturan website',
          'Hak untuk tidak menggunakan website',
          'Komitmen terhadap transparansi'
        ]
      },
      {
        id: 'content-policy',
        title: 'Penggunaan Website',
        icon: CodeBracketIcon,
        description: 'Tujuan dan batasan penggunaan website kami.',
        details: [
          'Informasi resmi GKJ Grogol Jakarta',
          'Pendaftaran kegiatan gereja',
          'Materi rohani dan informasi pelayanan',
          'Partisipasi kegiatan online'
        ]
      },
      {
        id: 'digital-rights',
        title: 'Konten dan Hak Cipta',
        icon: ShieldCheckIcon,
        description: 'Aturan penggunaan konten dan perlindungan hak cipta.',
        details: [
          'Konten milik GKJ Grogol Jakarta',
          'Penggunaan pribadi dan non-komersial',
          'Izin tertulis untuk distribusi',
          'Perlindungan hak intelektual'
        ]
      },
      {
        id: 'transaction-policy',
        title: 'Persembahan Online',
        icon: LightBulbIcon,
        description: 'Prosedur dan ketentuan persembahan online.',
        details: [
          'Verifikasi data transfer',
          'Konfirmasi transfer resmi',
          'Pencatatan sesuai peruntukan',
          'Keamanan transaksi digital'
        ]
      }
    ]
  };

  return <PageTemplateGenerator template={termsTemplate} />;
}
