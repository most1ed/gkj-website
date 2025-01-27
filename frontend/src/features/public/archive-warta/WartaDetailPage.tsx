import React from 'react';
import { useParams } from 'react-router-dom';
import { AnimatedPage } from '@/components/ui/AnimatedWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Download, FileText } from 'lucide-react';

// Dummy data - replace with actual data fetching
const wartaDetails = {
  '2025-01': {
    title: 'Warta Jemaat Januari 2025',
    date: '21 Januari 2025',
    description: 'Informasi terkini seputar kegiatan gereja bulan Januari 2025',
    content: `
      <h2>Rangkuman Kegiatan Gereja</h2>
      <p>Berikut adalah beberapa kegiatan penting yang telah dan akan dilaksanakan:</p>
      <ul>
        <li>Ibadah Minggu: Tema "Kasih Kristus Memerdekakan"</li>
        <li>Jadwal Pelayanan Sakramen Perjamuan: 2 Februari 2025</li>
        <li>Kegiatan Sosial: Bakti Sosial di Lingkungan Sekitar</li>
      </ul>
    `,
    pdfUrl: '/wartas/2025-01.pdf'
  },
  '2024-12': {
    title: 'Warta Jemaat Desember 2024',
    date: '15 Desember 2024',
    description: 'Rangkuman kegiatan akhir tahun 2024',
    content: `
      <h2>Refleksi Akhir Tahun</h2>
      <p>Sebuah tinjauan mendalam tentang perjalanan rohani dan kegiatan gereja sepanjang tahun 2024.</p>
    `,
    pdfUrl: '/wartas/2024-12.pdf'
  }
};

export default function WartaDetailPage() {
  const { slug } = useParams();
  const warta = wartaDetails[slug] || null;

  if (!warta) {
    return (
      <AnimatedPage>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Warta Tidak Ditemukan</h1>
          <p className="text-muted-foreground">Maaf, warta yang Anda cari tidak tersedia.</p>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{warta.title}</CardTitle>
            <CardDescription>{warta.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none mb-6" 
              dangerouslySetInnerHTML={{ __html: warta.content }}
            />

            <div className="flex space-x-4">
              <a 
                href={warta.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Unduh PDF
              </a>
              <a 
                href="/arsip-warta" 
                className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
              >
                <FileText className="mr-2 h-4 w-4" />
                Kembali ke Arsip
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  );
}
