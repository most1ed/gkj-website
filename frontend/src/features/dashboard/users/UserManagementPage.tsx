import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export function UserManagementPage() {
  const { user } = useAuth();

  const users = [
    { id: 1, name: 'Admin Utama', role: 'Administrator', email: 'admin@gkj.org' },
    { id: 2, name: 'Pendeta Budi', role: 'Majelis', email: 'budi@gkj.org' },
    { id: 3, name: 'Maria Setiawan', role: 'Warga Gereja', email: 'maria@gkj.org' }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Manajemen Pengguna</h1>
      
      {user?.role === 'Administrator' ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Pengguna</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Peran</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Akses Ditolak</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Anda tidak memiliki izin untuk mengakses halaman manajemen pengguna.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
