import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Widget } from '../../types/dashboard.types';

const ChurchAttendanceWidget: React.FC = () => {
  const attendanceData = [
    { service: 'Sunday Main', adults: 350, children: 75 },
    { service: 'Sunday School', adults: 200, children: 150 },
    { service: 'Wednesday Night', adults: 100, children: 50 }
  ];

  return (
    <div className="w-full h-full p-4">
      <h3 className="text-lg font-semibold mb-4">Church Attendance Breakdown</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="service" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="adults" stackId="a" fill="#8884d8" name="Adults" />
          <Bar dataKey="children" stackId="a" fill="#82ca9d" name="Children" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-gray-600">
        <p>Total Weekly Attendance: 675</p>
        <p>Growth Rate: 5.2% (Last Month)</p>
      </div>
    </div>
  );
};

export const churchAttendanceWidget: Widget = {
  id: 'church-attendance-custom',
  type: 'custom',
  title: 'Church Attendance',
  category: 'Attendance',
  component: ChurchAttendanceWidget,
  permissions: ['ADMIN', 'MINISTRY_LEADER', 'STAFF']
};

export default ChurchAttendanceWidget;
