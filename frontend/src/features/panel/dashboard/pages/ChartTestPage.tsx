import React from 'react';
import { DashboardWidget } from '../components/DashboardWidget';
import { 
  Widget, 
  chartTemplates, 
  CHART_CONFIGURATIONS, 
  ChartType 
} from '../types/chart-types';

export const ChartTestPage: React.FC = () => {
  // Fungsi untuk membuat widget dari template
  const createWidgetFromTemplate = (
    template: typeof chartTemplates[0], 
    index: number,
    overrideType?: ChartType
  ): Widget => ({
    id: `template-${template.id}-${index}`,
    type: 'chart',
    title: `${template.title} (${overrideType || template.type})`,
    chartType: overrideType || template.type,
    x: (index % 3) * 4,
    y: Math.floor(index / 3) * 4,
    w: 4,
    h: 3,
    data: template.data
  });

  // Kumpulkan semua widget untuk ditampilkan
  const testWidgets: Widget[] = [
    // Template asli
    ...chartTemplates.flatMap((template, index) => [
      createWidgetFromTemplate(template, index),
      // Tambahkan variasi tipe chart untuk setiap template
      ...(template.type !== 'line' ? [createWidgetFromTemplate(template, index, 'line')] : []),
      ...(template.type !== 'bar' ? [createWidgetFromTemplate(template, index, 'bar')] : []),
      ...(template.type !== 'pie' ? [createWidgetFromTemplate(template, index, 'pie')] : [])
    ]),

    // Contoh data kompleks
    {
      id: 'kompleks-statistik-jemaat',
      type: 'chart',
      title: 'Statistik Jemaat Kompleks',
      chartType: 'bar',
      x: 0,
      y: 8,
      w: 4,
      h: 3,
      data: {
        ageGroups: ['Anak', 'Remaja', 'Pemuda', 'Dewasa', 'Lansia'],
        ageDistribution: [100, 150, 200, 350, 50]
      }
    },
    {
      id: 'kompleks-keuangan',
      type: 'chart',
      title: 'Kontribusi Keuangan Tahunan',
      chartType: 'line',
      x: 4,
      y: 8,
      w: 4,
      h: 3,
      data: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        contributions: [
          5000000, 6200000, 5800000, 7100000, 6500000, 7300000,
          8000000, 7600000, 7200000, 7900000, 8500000, 9000000
        ]
      }
    },
    {
      id: 'kompleks-pelayanan',
      type: 'chart',
      title: 'Detail Pelayanan Gereja',
      chartType: 'pie',
      x: 8,
      y: 8,
      w: 4,
      h: 3,
      data: {
        services: [
          'Musik Worship', 
          'Multimedia', 
          'Pengkhotbah', 
          'Doa Syafaat', 
          'Usher', 
          'Pelayanan Anak'
        ]
      }
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Chart Test Page</h1>
      
      {/* Bagian Konfigurasi Chart */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Chart Configurations</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(CHART_CONFIGURATIONS).map(([key, config]) => (
            <div key={key} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold">{config.title}</h3>
              <p className="text-gray-600">{config.description}</p>
              <div className="mt-2">
                <span className="font-medium">Type:</span> {config.chartType}
                <br />
                <span className="font-medium">Data Source:</span> {config.dataSource}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Widget Chart */}
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
