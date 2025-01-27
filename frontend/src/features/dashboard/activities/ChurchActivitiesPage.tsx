import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export function ChurchActivitiesPage() {
  const { user } = useAuth();

  const activities = [
    { 
      id: 1, 
      name: 'Ibadah Minggu', 
      date: '4 Februari 2025', 
      time: '09:00 WIB', 
      location: 'Gedung Gereja' 
    },
    { 
      id: 2, 
      name: 'Persekutuan Doa', 
      date: '7 Februari 2025', 
      time: '19:00 WIB', 
      location: 'Ruang Doa' 
    },
    { 
      id: 3, 
      name: 'Pelayanan Sosial', 
      date: '15 Februari 2025', 
      time: '14:00 WIB', 
      location: 'Panti Asuhan' 
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Kegiatan Gereja</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Kegiatan</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Nama Kegiatan</th>
                  <th>Tanggal</th>
                  <th>Waktu</th>
                  <th>Lokasi</th>
                  {user?.role === 'Administrator' && <th>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity.id}>
                    <td>{activity.name}</td>
                    <td>{activity.date}</td>
                    <td>{activity.time}</td>
                    <td>{activity.location}</td>
                    {user?.role === 'Administrator' && (
                      <td>
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
