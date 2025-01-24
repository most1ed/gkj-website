import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DatePicker } from '@/components/ui/DatePicker';
import {
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentDownloadIcon,
} from '@heroicons/react/24/outline';

const transactions = [
  {
    id: 1,
    date: '2024-01-23',
    type: 'income',
    category: 'Persembahan Minggu',
    amount: 5000000,
    description: 'Persembahan Ibadah Minggu',
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-01-23',
    type: 'expense',
    category: 'Operasional',
    amount: 1500000,
    description: 'Pembayaran Listrik',
    status: 'completed',
  },
  // ... more transactions
];

export default function Transactions() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [transactionType, setTransactionType] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Transaksi</h1>
            <p className="mt-2 text-sm text-gray-700">
              Kelola transaksi keuangan gereja
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:flex sm:space-x-3">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => {/* Handle export */}}
            >
              <DocumentDownloadIcon className="h-5 w-5 mr-2" />
              Export
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Tambah Transaksi
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Card>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Total Pemasukan</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-green-600">
                  {formatCurrency(25500000)}
                </p>
                <p className="ml-2 text-sm font-medium text-gray-500">bulan ini</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Total Pengeluaran</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-red-600">
                  {formatCurrency(15000000)}
                </p>
                <p className="ml-2 text-sm font-medium text-gray-500">bulan ini</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Saldo</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-blue-600">
                  {formatCurrency(10500000)}
                </p>
                <p className="ml-2 text-sm font-medium text-gray-500">tersedia</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="p-6">
            {/* Filters */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <DatePicker
                label="Tanggal Mulai"
                value={dateRange.start}
                onChange={(date) => setDateRange({ ...dateRange, start: date })}
              />
              <DatePicker
                label="Tanggal Akhir"
                value={dateRange.end}
                onChange={(date) => setDateRange({ ...dateRange, end: date })}
              />
              <Select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="all">Semua Transaksi</option>
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </Select>
              <Input type="text" placeholder="Cari transaksi..." />
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deskripsi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          {transaction.type === 'income' ? (
                            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span
                            className={
                              transaction.type === 'income'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button variant="outline">Previous</Button>
                <Button variant="outline">Next</Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">50</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <Button variant="outline" className="rounded-l-md">
                      Previous
                    </Button>
                    <Button variant="outline" className="rounded-r-md">
                      Next
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
