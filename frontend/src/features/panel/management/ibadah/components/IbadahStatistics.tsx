import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Users, 
  Clock, 
  BookOpen, 
  Mic 
} from 'lucide-react';
import { mockIbadahService } from '@/lib/mock/ibadah';

export const IbadahStatistics: React.FC = () => {
  const { statistics } = mockIbadahService;

  const attendanceData = [
    { name: 'Minggu', Peserta: statistics.averageAttendance.sunday },
    { name: 'Rabu', Peserta: statistics.averageAttendance.wednesday },
    { name: 'Khusus', Peserta: statistics.averageAttendance.special }
  ];

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5" />
          Statistik Ibadah
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            icon={<Users className="w-5 h-5 text-primary" />}
            title="Total Peserta"
            value={`${statistics.totalAttendees} orang`}
          />
          <StatCard 
            icon={<Clock className="w-5 h-5 text-primary" />}
            title="Total Ibadah"
            value={`${statistics.totalServices} kali`}
          />
          <StatCard 
            icon={<BookOpen className="w-5 h-5 text-primary" />}
            title="Liturgi Unik"
            value={`${statistics.uniqueLiturgi} variasi`}
          />
          <StatCard 
            icon={<Mic className="w-5 h-5 text-primary" />}
            title="Pelayan Aktif"
            value={`${statistics.activePelayans} orang`}
          />
        </div>

        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} peserta`, 'Peserta']}
              />
              <Bar 
                dataKey="Peserta" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="flex items-center gap-3 p-4 border rounded-lg">
    {icon}
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);
