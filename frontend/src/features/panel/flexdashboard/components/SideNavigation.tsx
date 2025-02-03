import { 
  LayoutGrid, 
  Settings, 
  PieChart, 
  Users, 
  DollarSign, 
  X,
  BarChart 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { 
    name: 'Dashboard', 
    icon: LayoutGrid, 
    path: '/panel/dashboard' 
  },
  { 
    name: 'Flexdashboard', 
    icon: BarChart, 
    path: '/panel/flexdashboard' 
  },
  { 
    name: 'Analytics', 
    icon: PieChart, 
    path: '/panel/analytics' 
  },
  { 
    name: 'Membership', 
    icon: Users, 
    path: '/panel/members' 
  },
  { 
    name: 'Finances', 
    icon: DollarSign, 
    path: '/panel/finances' 
  },
  { 
    name: 'Settings', 
    icon: Settings, 
    path: '/panel/settings' 
  }
];

const SideNavigation: React.FC<SideNavigationProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const location = useLocation();

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Panel Menu</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="mt-4">
        {navigationItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center p-3 mx-2 rounded-lg transition-colors duration-200",
              location.pathname === item.path 
                ? "bg-blue-100 text-blue-600" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon className="mr-3" size={20} />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideNavigation;
