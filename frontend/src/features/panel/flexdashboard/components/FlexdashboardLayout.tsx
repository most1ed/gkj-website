import React, { useState } from 'react';
import { 
  LayoutGrid, 
  PlusCircle, 
  Settings, 
  Menu 
} from 'lucide-react';
import SideNavigation from './SideNavigation';
import TopBar from './TopBar';
import WidgetLibrary from './WidgetLibrary';
import { Widget } from '../types/dashboard.types';
import { PermissionManager, UserRole } from '../utils/permissionUtils';
import { useDashboardStore } from '../store/dashboardStore';

const FlexdashboardLayout: React.FC = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isWidgetLibraryOpen, setIsWidgetLibraryOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('ADMIN'); // Dynamic role management

  const { addWidget } = useDashboardStore();

  const handleWidgetSelect = (widget: Widget) => {
    if (PermissionManager.canAccessWidget(userRole, widget)) {
      addWidget(widget);
      setIsWidgetLibraryOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navigation */}
      <SideNavigation 
        isOpen={isSideNavOpen} 
        onClose={() => setIsSideNavOpen(false)} 
      />

      {/* Main Dashboard Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <TopBar 
          onMenuToggle={() => setIsSideNavOpen(!isSideNavOpen)} 
          onAddWidget={() => setIsWidgetLibraryOpen(true)}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 relative">
          {/* Actual Dashboard Content Goes Here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Dashboard Widgets Will Be Rendered Here */}
          </div>

          {/* Widget Library Overlay */}
          {isWidgetLibraryOpen && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white w-3/4 h-3/4 rounded-lg p-6 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Widget Library</h2>
                  <button 
                    onClick={() => setIsWidgetLibraryOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
                <WidgetLibrary 
                  userRole={userRole} 
                  onWidgetSelect={handleWidgetSelect} 
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FlexdashboardLayout;
