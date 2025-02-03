import React, { useState } from 'react';
import { 
  Settings, 
  Filter, 
  Palette, 
  Lock, 
  Unlock 
} from 'lucide-react';
import { Widget } from '../types/dashboard.types';
import { PermissionManager, UserRole } from '../utils/permissionUtils';
import { useDashboardStore } from '../store/dashboardStore';

interface WidgetConfigPageProps {
  widget: Widget;
}

const WidgetConfigPage: React.FC<WidgetConfigPageProps> = ({ widget }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN');
  const [widgetConfig, setWidgetConfig] = useState({
    title: widget.title,
    category: widget.category,
    permissions: [...widget.permissions]
  });

  const { updateWidget } = useDashboardStore();

  const availableRoles: UserRole[] = [
    'SUPER_ADMIN', 
    'ADMIN', 
    'STAFF', 
    'TREASURER', 
    'MINISTRY_LEADER', 
    'MEMBER'
  ];

  const handleConfigUpdate = () => {
    const updatedWidget: Widget = {
      ...widget,
      ...widgetConfig
    };
    updateWidget(updatedWidget);
  };

  const renderGeneralSettings = () => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Settings className="mr-2" /> General Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Widget Title
          </label>
          <input 
            type="text"
            value={widgetConfig.title}
            onChange={(e) => setWidgetConfig(prev => ({
              ...prev, 
              title: e.target.value
            }))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input 
            type="text"
            value={widgetConfig.category}
            onChange={(e) => setWidgetConfig(prev => ({
              ...prev, 
              category: e.target.value
            }))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
      </div>
    </div>
  );

  const renderPermissionSettings = () => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Lock className="mr-2" /> Permissions
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Allowed Roles
          </label>
          <div className="grid grid-cols-3 gap-2">
            {availableRoles.map(role => (
              <label 
                key={role} 
                className="inline-flex items-center"
              >
                <input
                  type="checkbox"
                  checked={widgetConfig.permissions.includes(role)}
                  onChange={() => {
                    const updatedPermissions = widgetConfig.permissions.includes(role)
                      ? widgetConfig.permissions.filter(r => r !== role)
                      : [...widgetConfig.permissions, role];
                    
                    setWidgetConfig(prev => ({
                      ...prev,
                      permissions: updatedPermissions
                    }));
                  }}
                  className="form-checkbox"
                />
                <span className="ml-2">{role}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Filter className="mr-2" /> Data Configuration
      </h3>
      <div className="space-y-4">
        {/* Placeholder for data configuration */}
        <p className="text-gray-500">
          Data configuration options will be added based on widget type.
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Configure: {widget.title}
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsLocked(!isLocked)}
              className={`p-2 rounded ${isLocked ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
              {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
            </button>
            <button 
              onClick={handleConfigUpdate}
              disabled={isLocked}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Save Configuration
            </button>
          </div>
        </div>

        {renderGeneralSettings()}
        {renderPermissionSettings()}
        {renderDataSettings()}
      </div>
    </div>
  );
};

export default WidgetConfigPage;
