import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { DashboardWidget } from './components/DashboardWidget';
import { useDashboardStore } from './store/dashboard-store';
import { ChartType } from './types/chart-types';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Network 
} from 'lucide-react';
import { GRID_CONFIG } from './utils/grid-utils';

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  return (
    <div role="alert" className="p-6 bg-red-50 text-red-900 rounded-lg">
      <h2 className="text-lg font-bold">Oops! Something went wrong</h2>
      <pre className="whitespace-pre-wrap mt-2">{error.message}</pre>
      <Button 
        onClick={resetErrorBoundary} 
        className="mt-4"
        variant="destructive"
      >
        Try again
      </Button>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { widgets, addWidget } = useDashboardStore();
  const [selectedType, setSelectedType] = useState<ChartType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridColumns, setGridColumns] = useState(GRID_CONFIG.MAX_COLUMNS);

  // Dynamically adjust grid columns based on container width
  useEffect(() => {
    const updateGridColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const calculatedColumns = Math.floor(containerWidth / GRID_CONFIG.CELL_SIZE);
        setGridColumns(Math.min(calculatedColumns, GRID_CONFIG.MAX_COLUMNS));
      }
    };

    updateGridColumns();
    window.addEventListener('resize', updateGridColumns);
    return () => window.removeEventListener('resize', updateGridColumns);
  }, []);

  const chartTypes = useMemo(() => [
    { type: 'bar', icon: BarChart, label: 'Bar Chart' },
    { type: 'line', icon: LineChart, label: 'Line Chart' },
    { type: 'pie', icon: PieChart, label: 'Pie Chart' },
    { type: 'sankey', icon: Network, label: 'Sankey Diagram' }
  ], []);

  const handleAddWidget = (type: ChartType) => {
    addWidget({
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      data: null,
      layout: {
        x: 0,
        y: 0,
        w: Math.floor(gridColumns / 3),
        h: 4
      }
    });
  };

  const handleErrorReset = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={handleErrorReset}
    >
      <div className="p-6 space-y-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Interactive Dashboard</h1>
          <div className="flex space-x-2">
            {chartTypes.map(({ type, icon: Icon, label }) => (
              <Button 
                key={type} 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddWidget(type)}
                className="flex items-center space-x-2"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </div>
        <div 
          ref={containerRef}
          className="relative w-full bg-gray-50 dark:bg-gray-900 rounded-lg overflow-auto"
          style={{
            height: `${GRID_CONFIG.MAX_ROWS * GRID_CONFIG.CELL_SIZE}px`,
            minHeight: '500px',
            maxHeight: 'calc(100vh - 250px)'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              width: `${gridColumns * GRID_CONFIG.CELL_SIZE}px`
            }}
          >
            {widgets.map(widget => (
              <DashboardWidget 
                key={widget.id} 
                widget={{
                  ...widget,
                  layout: {
                    ...widget.layout,
                    w: Math.min(widget.layout.w, gridColumns)
                  }
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default DashboardPage;
