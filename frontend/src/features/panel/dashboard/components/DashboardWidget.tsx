import React from 'react';
import { Rnd } from 'react-rnd';
import { cn } from '@/lib/utils';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Pencil as PencilIcon, X as TrashIcon } from 'lucide-react';
import { useTheme } from '@/components/common/theme/ThemeProvider';
import { 
  Widget, 
  chartTemplates, 
  ChartData,
  convertStatistikJemaatToChartData,
  convertFinancialToChartData,
  convertServiceToChartData,
  convertScheduleToChartData,
  StatistikJemaatData,
  FinancialContributionData,
  ServiceData,
  ScheduleData,
} from '../types/chart-types';

interface DashboardWidgetProps {
  widget: Widget;
  onDelete: (id: string) => void;
  onDragStop: (e: any, d: any) => void;
  onResizeStop: (e: any, direction: any, ref: any, delta: any, position: any) => void;
  isSelected?: boolean;
  theme?: 'light' | 'dark';
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({ 
  widget, 
  onDelete, 
  onDragStop,
  onResizeStop,
  isSelected,
  theme = 'light'
}) => {
  const { theme: currentTheme } = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  const renderWidgetContent = () => {
    // Completely prevent rendering of non-primitive data types
    if (widget.type === 'chart') {
      const prepareChartData = (): ChartData[] => {
        // Strict type checking for chart data
        if (Array.isArray(widget.data) && 
            widget.data.length > 0 && 
            widget.data.every(item => 
              typeof item === 'object' && 
              'name' in item && 
              'value' in item && 
              typeof item.name === 'string' && 
              typeof item.value === 'number'
            )) {
          return widget.data as ChartData[];
        }

        // Handle specific data types with explicit conversion
        if (widget.data && typeof widget.data === 'object') {
          // StatistikJemaatData conversion
          if ('ageGroups' in widget.data && 'ageDistribution' in widget.data) {
            const { ageGroups, ageDistribution } = widget.data as StatistikJemaatData;
            return ageGroups.map((name, index) => ({
              name, 
              value: ageDistribution[index] || 0
            }));
          }

          // FinancialContributionData conversion
          if ('months' in widget.data && 'contributions' in widget.data) {
            const { months, contributions } = widget.data as FinancialContributionData;
            return months.map((name, index) => ({
              name, 
              value: contributions[index] || 0
            }));
          }

          // ServiceData conversion
          if ('services' in widget.data) {
            const { services } = widget.data as ServiceData;
            return services.map((name, index) => ({
              name, 
              value: index + 1 // Placeholder value
            }));
          }

          // ScheduleData conversion
          if ('schedules' in widget.data) {
            const { schedules } = widget.data as ScheduleData;
            return schedules.map((name, index) => ({
              name, 
              value: index + 1 // Placeholder value
            }));
          }
        }

        // Fallback to template or default data
        const template = chartTemplates.find(t => t.title === widget.title);
        return template?.data || [{ name: 'No Data', value: 0 }];
      };

      // Get prepared chart data
      const chartData = prepareChartData();

      // Validate chart data before rendering
      if (!chartData || chartData.length === 0) {
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <span>No chart data available</span>
          </div>
        );
      }

      // Get template and chart type
      const template = chartTemplates.find(t => t.title === widget.title);
      const chartType = widget.chartType || template?.type;

      // Render chart based on type
      switch (chartType) {
        case 'line':
          return (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          );

        case 'bar':
          return (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          );

        case 'pie':
          return (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          );

        default:
          return (
            <div className="flex items-center justify-center h-full text-gray-500">
              <span>Unsupported chart type</span>
            </div>
          );
      }
    } else if (widget.type === 'text' && typeof widget.data === 'string') {
      // Render text widget with string data
      return (
        <div className="p-2 text-sm">
          {widget.data}
        </div>
      );
    }

    // Fallback for unsupported widget types or invalid data
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <span>Invalid widget data</span>
      </div>
    );
  };

  return (
    <Rnd
      className={cn(
        "widget rounded-lg border",
        currentTheme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        "shadow-lg transition-all duration-200 ease-in-out hover:shadow-xl",
        isSelected && "ring-2 ring-blue-500"
      )}
      default={{
        x: widget.x,
        y: widget.y,
        width: widget.w,
        height: widget.h,
      }}
      minWidth={widget.minW || 200}
      minHeight={widget.minH || 200}
      bounds="parent"
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      dragHandleClassName="drag-handle"
      enableResizing={!widget.static}
      disableDragging={widget.static}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="drag-handle flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <h3 className={cn(
              "text-sm font-medium",
              currentTheme === "dark" ? "text-gray-200" : "text-gray-700"
            )}>
              {widget.title}
            </h3>
          </div>
          <div className={cn(
            "flex items-center gap-2 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {!widget.static && (
              <>
                <button
                  onClick={() => {/* Handle edit */}}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <PencilIcon className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => onDelete(widget.id)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <TrashIcon className="w-4 h-4 text-gray-500" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Widget Content */}
        <div className="flex-1 min-h-0">
          {renderWidgetContent()}
        </div>
      </div>
    </Rnd>
  );
};
