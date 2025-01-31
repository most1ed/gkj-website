import React, { useCallback, useMemo } from 'react';
import { Rnd } from 'react-rnd';
import ReactECharts from 'echarts-for-react';
import { Trash2 } from 'lucide-react';
import { DashboardWidget as WidgetType } from '../types/chart-types';
import { useDashboardStore } from '../store/dashboard-store';
import { Button } from '@/components/ui/button';
import { GRID_CONFIG } from '../utils/grid-utils';

export const DashboardWidget: React.FC<{ widget: WidgetType }> = ({ widget }) => {
  const { removeWidget, updateWidget } = useDashboardStore();

  const handleResize = useCallback((e, direction, ref, delta, position) => {
    const newWidth = Math.round(parseInt(ref.style.width) / GRID_CONFIG.CELL_SIZE);
    const newHeight = Math.round(parseInt(ref.style.height) / GRID_CONFIG.CELL_SIZE);

    updateWidget(widget.id, {
      layout: {
        ...widget.layout,
        w: newWidth,
        h: newHeight,
        ...position
      }
    });
  }, [widget.id, updateWidget]);

  const handleDragStop = useCallback((e, d) => {
    const newX = Math.round(d.x / GRID_CONFIG.CELL_SIZE);
    const newY = Math.round(d.y / GRID_CONFIG.CELL_SIZE);

    updateWidget(widget.id, {
      layout: {
        ...widget.layout,
        x: newX,
        y: newY
      }
    });
  }, [widget.id, updateWidget]);

  const widgetStyle = useMemo(() => ({
    position: 'absolute',
    left: `${widget.layout.x * GRID_CONFIG.CELL_SIZE}px`,
    top: `${widget.layout.y * GRID_CONFIG.CELL_SIZE}px`,
    width: `${widget.layout.w * GRID_CONFIG.CELL_SIZE}px`,
    height: `${widget.layout.h * GRID_CONFIG.CELL_SIZE}px`,
    transition: 'all 0.2s ease'
  }), [widget.layout]);

  return (
    <Rnd
      size={{ 
        width: widgetStyle.width, 
        height: widgetStyle.height 
      }}
      position={{ 
        x: parseInt(widgetStyle.left), 
        y: parseInt(widgetStyle.top) 
      }}
      onResize={handleResize}
      onDragStop={handleDragStop}
      minWidth={GRID_CONFIG.CELL_SIZE * 2}
      minHeight={GRID_CONFIG.CELL_SIZE * 2}
      maxWidth={GRID_CONFIG.CELL_SIZE * GRID_CONFIG.MAX_COLUMNS}
      maxHeight={GRID_CONFIG.CELL_SIZE * GRID_CONFIG.MAX_ROWS}
      bounds="parent"
      resizeGrid={[GRID_CONFIG.CELL_SIZE, GRID_CONFIG.CELL_SIZE]}
      dragGrid={[GRID_CONFIG.CELL_SIZE, GRID_CONFIG.CELL_SIZE]}
      className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 overflow-hidden"
    >
      <div className="absolute top-2 right-2 z-10 flex space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-8 h-8"
          onClick={() => removeWidget(widget.id)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
      
      <div className="w-full h-full p-4 pt-8">
        <h3 className="absolute top-2 left-2 text-sm font-semibold">{widget.title}</h3>
        <ReactECharts 
          option={widget.options} 
          style={{ 
            height: '100%', 
            width: '100%' 
          }} 
        />
      </div>
    </Rnd>
  );
};

export default DashboardWidget;
