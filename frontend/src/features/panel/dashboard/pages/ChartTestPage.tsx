import React from 'react';
import { DashboardWidget } from '../components/DashboardWidget';
import { Widget } from '../types/chart-types';

export const ChartTestPage: React.FC = () => {
  // Contoh data untuk berbagai jenis chart
  const testWidgets: Widget[] = [
    {
      id: 'statistik-jemaat',
      type: 'chart',
      title: 'Statistik Jemaat',
      chartType: 'bar',
      x: 0,
      y: 0,
      w: 4,
      h: 3,
      data: {
        ageGroups: ['Anak', 'Remaja', 'Pemuda', 'Dewasa'],
        ageDistribution: [150, 200, 250, 400]
      }
    },
    {
      id: 'kontribusi-keuangan',
      type: 'chart',
      title: 'Kontribusi Keuangan',
      chartType: 'line',
      x: 4,
      y: 0,
      w: 4,
      h: 3,
      data: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        contributions: [5000000, 6200000, 5800000, 7100000, 6500000, 7300000]
      }
    },
    {
      id: 'pelayanan-gereja',
      type: 'chart',
      title: 'Status Pelayanan',
      chartType: 'pie',
      x: 8,
      y: 0,
      w: 4,
      h: 3,
      data: {
        services: ['Musik', 'Pengkhotbah', 'Doa', 'Multimedia', 'Usher']
      }
    },
    {
      id: 'jadwal-ibadah',
      type: 'chart',
      title: 'Jadwal Ibadah',
      chartType: 'bar',
      x: 0,
      y: 3,
      w: 4,
      h: 3,
      data: {
        schedules: ['Minggu Pagi', 'Minggu Siang', 'Rabu Malam', 'Jumat Pemuda']
      }
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Chart Test Page</h1>
      <div className="grid grid-cols-12 gap-4">
        {testWidgets.map(widget => (
          <div key={widget.id} className="col-span-4">
            <DashboardWidget 
              widget={widget}
              onDelete={() => {}} // Placeholder
              onDragStop={() => {}} // Placeholder
              onResizeStop={() => {}} // Placeholder
            />
          </div>
        ))}
      </div>
    </div>
  );
};
