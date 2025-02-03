import React, { useState } from 'react';
import { 
  churchAttendanceChartWidget, 
  financialChartWidget 
} from '../widgets/library/ChartWidget';
import { 
  churchMemberStatisticsWidget, 
  financialStatisticsWidget 
} from '../widgets/library/StatisticsWidget';
import { 
  memberListWidget, 
  financeTransactionsWidget 
} from '../widgets/library/TableWidget';
import { churchAttendanceWidget } from '../widgets/custom/ChurchAttendanceWidget';
import { Widget } from '../types/dashboard.types';
import { PermissionManager, UserRole } from '../utils/permissionUtils';

const ALL_WIDGETS: Widget[] = [
  churchAttendanceChartWidget,
  financialChartWidget,
  churchMemberStatisticsWidget,
  financialStatisticsWidget,
  memberListWidget,
  financeTransactionsWidget,
  churchAttendanceWidget
];

const WidgetLibrary: React.FC<{ 
  userRole: UserRole, 
  onWidgetSelect: (widget: Widget) => void 
}> = ({ userRole, onWidgetSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWidgets = ALL_WIDGETS
    .filter(widget => 
      PermissionManager.canAccessWidget(userRole, widget) &&
      (widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       widget.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="widget-library p-4 bg-gray-50 rounded-lg">
      <input 
        type="text" 
        placeholder="Search widgets..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="grid grid-cols-2 gap-4">
        {filteredWidgets.map(widget => (
          <div 
            key={widget.id} 
            className="bg-white p-3 rounded-lg shadow-md cursor-pointer hover:bg-blue-50"
            onClick={() => onWidgetSelect(widget)}
          >
            <h4 className="font-semibold">{widget.title}</h4>
            <p className="text-sm text-gray-500">{widget.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetLibrary;
