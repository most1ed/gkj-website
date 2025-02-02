import React from 'react';
import { DashboardWidget } from '../components/DashboardWidget';
import { 
  Widget, 
  chartTemplates, 
  CHART_CONFIGURATIONS, 
  ChartType
} from '../types/chart-types';

export const ChartTestPage: React.FC = () => {
  const [widgets, setWidgets] = React.useState<Widget[]>([]);

  // Function to create a widget from template
  const createWidgetFromTemplate = (
    template: typeof chartTemplates[0], 
    index: number,
    overrideType?: ChartType
  ): Widget => ({
    id: `template-${index}`,
    type: 'chart',
    title: template.title,
    chartType: overrideType || template.type,
    options: {
      ...CHART_CONFIGURATIONS[overrideType || template.type].defaultOptions,
      ...template.options
    },
    data: generateSampleData(overrideType || template.type),
    layout: {
      x: (index % 3) * 400,
      y: Math.floor(index / 3) * 300,
      w: 380,
      h: 280
    }
  });

  // Function to generate sample data based on chart type
  const generateSampleData = (type: ChartType) => {
    switch (type) {
      case 'bar':
        return {
          xAxis: {
            data: ['0-10', '11-20', '21-30', '31-40', '41-50', '51+']
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110]
          }]
        };
      case 'line':
        return {
          xAxis: {
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330]
          }]
        };
      case 'pie':
        return {
          series: [{
            data: [
              { value: 1048, name: 'Ibadah Minggu' },
              { value: 735, name: 'Ibadah Rabu' },
              { value: 580, name: 'Ibadah Jumat' },
              { value: 484, name: 'Persekutuan Doa' }
            ]
          }]
        };
      default:
        return {
          series: [{
            data: []
          }]
        };
    }
  };

  React.useEffect(() => {
    // Create initial widgets from templates
    const initialWidgets = chartTemplates.map((template, index) => 
      createWidgetFromTemplate(template, index)
    );
    setWidgets(initialWidgets);
  }, []);

  const handleDelete = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const handleDragStop = (id: string, x: number, y: number) => {
    setWidgets(widgets.map(w => 
      w.id === id 
        ? { ...w, layout: { ...w.layout, x, y } }
        : w
    ));
  };

  const handleResizeStop = (
    id: string,
    width: number,
    height: number,
    x: number,
    y: number
  ) => {
    setWidgets(widgets.map(w => 
      w.id === id 
        ? { ...w, layout: { x, y, w: width, h: height } }
        : w
    ));
  };

  return (
    <div className="relative h-full w-full overflow-hidden p-4">
      <div className="absolute inset-0">
        {widgets.map((widget) => (
          <DashboardWidget
            key={widget.id}
            widget={widget}
            onDelete={handleDelete}
            onDragStop={(e, d) => handleDragStop(widget.id, d.x, d.y)}
            onResizeStop={(e, direction, ref, delta, position) => 
              handleResizeStop(
                widget.id,
                ref.offsetWidth,
                ref.offsetHeight,
                position.x,
                position.y
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
