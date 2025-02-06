import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Types for SDA (Sumber Daya Alam / Natural Resources) Statistics
interface SDAStatisticsProps {
  sdmData?: any[];  // Human Resources
  assetData?: any[];  // Assets
}

export function SDAStatistics({ sdmData = [], assetData = [] }: SDAStatisticsProps) {
  // Process data for visualization
  const processedData = [
    ...sdmData.map(sdm => ({
      category: sdm.role || 'Undefined Role',
      total: sdm.skills?.length || 0,
      utilized: sdm.availability === 'active' ? 1 : 0,
      remaining: sdm.availability !== 'active' ? 1 : 0
    })),
    ...assetData.map(asset => ({
      category: asset.category || 'Undefined Category',
      total: 1,
      utilized: asset.status === 'in-use' ? 1 : 0,
      remaining: asset.status !== 'in-use' ? 1 : 0
    }))
  ];

  // If no data, show a placeholder
  if (processedData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Statistik Sumber Daya</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Tidak ada data yang tersedia</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Statistik Sumber Daya</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData}>
            <XAxis dataKey="category" />
            <YAxis label={{ value: 'Jumlah', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value, name, props) => {
                switch(name) {
                  case 'total': return [`${value} Total`, 'Total'];
                  case 'utilized': return [`${value} Digunakan`, 'Digunakan'];
                  case 'remaining': return [`${value} Tersisa`, 'Tersisa'];
                  default: return [value, name];
                }
              }}
            />
            <Bar dataKey="total" fill="#8884d8" stackId="a" />
            <Bar dataKey="utilized" fill="#82ca9d" stackId="a" />
            <Bar dataKey="remaining" fill="#ffc658" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
