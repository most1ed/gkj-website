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
import { PermissionManager, UserRole } from '../../utils/permissionUtils';

interface ChartWidgetProps {
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ 
  data, 
  xKey, 
  yKey, 
  title 
}) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const churchAttendanceChartWidget: Widget = {
  id: 'church-attendance-chart',
  type: 'chart',
  title: 'Church Attendance',
  category: 'Church Metrics',
  component: () => (
    <ChartWidget 
      data={[
        { month: 'Jan', attendance: 120 },
        { month: 'Feb', attendance: 150 },
        { month: 'Mar', attendance: 180 },
      ]}
      xKey="month"
      yKey="attendance"
      title="Monthly Church Attendance"
    />
  ),
  permissions: ['ADMIN', 'MINISTRY_LEADER', 'STAFF']
};

export const financialChartWidget: Widget = {
  id: 'financial-chart',
  type: 'chart',
  title: 'Financial Overview',
  category: 'Finance',
  component: () => (
    <ChartWidget 
      data={[
        { month: 'Jan', income: 50000, expenses: 40000 },
        { month: 'Feb', income: 55000, expenses: 42000 },
        { month: 'Mar', income: 60000, expenses: 45000 },
      ]}
      xKey="month"
      yKey="income"
      title="Monthly Financial Overview"
    />
  ),
  permissions: ['TREASURER', 'ADMIN']
};

export default ChartWidget;
