import React, { useState } from 'react';
import { 
  Menu, 
  PlusCircle, 
  Bell, 
  User, 
  Search 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  onMenuToggle: () => void;
  onAddWidget: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ 
  onMenuToggle, 
  onAddWidget 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New member joined', time: '2m ago' },
    { id: 2, message: 'Upcoming event', time: '1h ago' }
  ]);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between p-4">
        {/* Left Section: Menu Toggle & Title */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuToggle}
            className="text-gray-600 hover:text-gray-800"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Flexdashboard
          </h1>
        </div>

        {/* Center Section: Search */}
        <div className="flex-1 mx-4 relative">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search dashboards, widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-4">
          {/* Add Widget Button */}
          <button 
            onClick={onAddWidget}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <PlusCircle size={24} className="mr-2" />
            Add Widget
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="text-gray-600 hover:text-gray-800 relative">
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>

          {/* User Profile */}
          <button className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <User size={20} />
            </div>
            <span className="text-sm font-medium">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
