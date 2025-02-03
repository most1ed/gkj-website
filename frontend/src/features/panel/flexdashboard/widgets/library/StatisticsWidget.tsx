import { Widget } from '../../types/dashboard.types';
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  UserIcon, 
  DollarSignIcon 
} from 'lucide-react';

interface StatisticCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ 
  title, 
  value, 
  change, 
  icon 
}) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
        <div className="flex items-center">
          <span className="text-2xl font-bold mr-2">{value}</span>
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUpIcon size={20} /> : <TrendingDownIcon size={20} />}
            <span className="ml-1 text-sm">{Math.abs(change)}%</span>
          </div>
        </div>
      </div>
      <div className="text-gray-400">{icon}</div>
    </div>
  );
};

const StatisticsWidget: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <StatisticCard 
        title="Total Members" 
        value={1250} 
        change={5.2} 
        icon={<UserIcon size={32} />} 
      />
      <StatisticCard 
        title="Monthly Offerings" 
        value="$45,000" 
        change={3.8} 
        icon={<DollarSignIcon size={32} />} 
      />
    </div>
  );
};

export const churchMemberStatisticsWidget: Widget = {
  id: 'church-member-stats',
  type: 'statistics',
  title: 'Church Member Statistics',
  category: 'Membership',
  component: StatisticsWidget,
  permissions: ['ADMIN', 'STAFF', 'MINISTRY_LEADER']
};

export const financialStatisticsWidget: Widget = {
  id: 'financial-stats',
  type: 'statistics',
  title: 'Financial Statistics',
  category: 'Finance',
  component: StatisticsWidget,
  permissions: ['TREASURER', 'ADMIN']
};

export default StatisticsWidget;
