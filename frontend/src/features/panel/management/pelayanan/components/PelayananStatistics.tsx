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
import { logError } from '@/lib/error-logging';

// Types for Pelayanan Statistics
interface PelayananData {
  category: string;
  totalPersonnel: number;
  activePersonnel: number;
  newRecruits: number;
}

interface PelayananStatisticsProps {
  data?: PelayananData[] | null | undefined;
}

export function PelayananStatistics({ data }: PelayananStatisticsProps) {
  // Ensure data is an array, log error if not
  const processedData = React.useMemo(() => {
    if (!data) {
      logError('PelayananStatistics received null or undefined data');
      return [];
    }
    
    if (!Array.isArray(data)) {
      logError('PelayananStatistics received non-array data', { receivedType: typeof data });
      return [];
    }
    
    return data;
  }, [data]);

  // If no data, show a placeholder
  if (processedData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Statistik Pelayanan</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Tidak ada data pelayanan yang tersedia</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Statistik Pelayanan</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData}>
            <XAxis dataKey="category" />
            <YAxis 
              label={{ 
                value: 'Jumlah Pelayan', 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            <Tooltip 
              formatter={(value, name) => {
                switch(name) {
                  case 'totalPersonnel': return [value, 'Total Pelayan'];
                  case 'activePersonnel': return [value, 'Pelayan Aktif'];
                  case 'newRecruits': return [value, 'Rekrut Baru'];
                  default: return [value, name];
                }
              }}
            />
            <Bar dataKey="totalPersonnel" fill="#82ca9d" stackId="a" />
            <Bar dataKey="activePersonnel" fill="#8884d8" stackId="a" />
            <Bar dataKey="newRecruits" fill="#ff6b6b" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          {processedData.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-sm font-medium">{item.category}</p>
              <p className="text-xs text-muted-foreground">
                Total: {item.totalPersonnel}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
