import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export function FinancialReportPage() {
  const { user } = useAuth();

  const financialData = {
    totalIncome: 125000000,
    totalExpenses: 95000000,
    categories: [
      { name: 'Operasional', amount: 50000000 },
      { name: 'Misi', amount: 37500000 },
      { name: 'Sosial', amount: 25000000 }
    ]
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Laporan Keuangan</h1>
      
      {user?.role === 'Administrator' || user?.role === 'Majelis' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Keuangan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Total Pemasukan: Rp {financialData.totalIncome.toLocaleString()}</p>
                <p>Total Pengeluaran: Rp {financialData.totalExpenses.toLocaleString()}</p>
                <p>Saldo: Rp {(financialData.totalIncome - financialData.totalExpenses).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kategori Pengeluaran</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Kategori</th>
                    <th>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {financialData.categories.map(category => (
                    <tr key={category.name}>
                      <td>{category.name}</td>
                      <td>Rp {category.amount.toLocaleString()}</td>
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
            <p>Anda tidak memiliki izin untuk melihat laporan keuangan.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
