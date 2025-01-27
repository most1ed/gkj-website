import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

export function DashboardHomePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Selamat Datang, {user?.name || 'Pengguna'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Anda login sebagai: {user?.role || 'Tidak diketahui'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistik Gereja</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Total Jemaat: 250</li>
              <li>Ibadah Minggu Terakhir: 180</li>
              <li>Kegiatan Bulan Ini: 12</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengumuman Terkini</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Persiapan HUT Gereja</li>
              <li>Jadwal Pelayanan Februari</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
