import React from 'react';
import { Rnd } from 'react-rnd';
import { cn } from '@/lib/utils';
import ReactECharts from 'echarts-for-react';
import { Pencil as PencilIcon, X as TrashIcon } from 'lucide-react';
import { useTheme } from '@/components/common/theme/ThemeProvider';
import { 
  Widget, 
  chartTemplates, 
  CHART_CONFIGURATIONS 
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
  const { isDarkMode } = useTheme();
  const currentTheme = theme || (isDarkMode ? 'dark' : 'light');

  const getChartOptions = () => {
    const template = chartTemplates.find(t => t.title === widget.title);
    if (!template) return widget.options;

    const baseOptions = CHART_CONFIGURATIONS[widget.chartType]?.defaultOptions || {};
    return {
      ...baseOptions,
      ...template.options,
      ...widget.options,
      theme: currentTheme
    };
  };

  return (
    <Rnd
      className={cn(
        'relative rounded-lg border bg-background p-4 shadow-sm',
        isSelected && 'ring-2 ring-primary',
        currentTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      )}
      default={{
        x: widget.layout?.x || 0,
        y: widget.layout?.y || 0,
        width: widget.layout?.w || 300,
        height: widget.layout?.h || 200
      }}
      minWidth={200}
      minHeight={150}
      bounds="parent"
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
    >
      <div className="flex h-full flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{widget.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => {/* TODO: Implement edit functionality */}}
              className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(widget.id)}
              className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex-1">
          <ReactECharts
            option={getChartOptions()}
            style={{ height: '100%', width: '100%' }}
            theme={currentTheme}
          />
        </div>
      </div>
    </Rnd>
  );
};
