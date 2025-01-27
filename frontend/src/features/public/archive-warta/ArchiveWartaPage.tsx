import React, { useState } from 'react';
import { AnimatedPage } from '@/components/ui/AnimatedWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

// Dummy data - replace with actual data fetching
const wartaArchiveData = [
  {
    id: '1',
    title: 'Warta Jemaat Januari 2025',
    date: '21 Januari 2025',
    description: 'Informasi terkini seputar kegiatan gereja bulan Januari 2025',
    url: '/warta/2025-01'
  },
  {
    id: '2',
    title: 'Warta Jemaat Desember 2024',
    date: '15 Desember 2024',
    description: 'Rangkuman kegiatan akhir tahun 2024',
    url: '/warta/2024-12'
  },
  // Add more warta entries
];

export default function ArchiveWartaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWarta = wartaArchiveData.filter(warta => 
    warta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warta.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatedPage>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Arsip Warta Jemaat</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kumpulan warta jemaat dari berbagai periode
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Cari warta berdasarkan judul atau deskripsi"
              className="pl-10 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Warta List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWarta.map((warta) => (
            <Card key={warta.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{warta.title}</CardTitle>
                <CardDescription>{warta.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{warta.description}</p>
                <a 
                  href={warta.url} 
                  className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Lihat Warta
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWarta.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Tidak ada warta yang ditemukan.
            </p>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}