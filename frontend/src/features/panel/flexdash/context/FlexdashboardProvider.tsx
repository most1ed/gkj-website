import React, { 
  createContext, 
  useState, 
  useContext, 
  ReactNode 
} from 'react';
import { WidgetData } from '../../dashboard/components/DashboardWidget';

// Define the shape of the context
interface FlexdashboardContextType {
  widgets: WidgetData[];
  addWidget: (widget: WidgetData) => void;
  removeWidget: (widgetId: string) => void;
  updateWidget: (widget: WidgetData) => void;
}

// Create the context with a default value
const FlexdashboardContext = createContext<FlexdashboardContextType>({
  widgets: [],
  addWidget: () => {},
  removeWidget: () => {},
  updateWidget: () => {}
});

// Provider component
export function FlexdashboardProvider({ children }: { children: ReactNode }) {
  const [widgets, setWidgets] = useState<WidgetData[]>([
    {
      id: 'default-widget-1',
      title: 'Kehadiran Jemaat',
      type: 'bar',
      data: [
        { name: 'Jan', value: 120 },
        { name: 'Feb', value: 150 },
        { name: 'Mar', value: 180 }
      ]
    }
  ]);

  const addWidget = (widget: WidgetData) => {
    setWidgets(prevWidgets => [...prevWidgets, {
      ...widget,
      id: `widget-${Date.now()}` // Ensure unique ID
    }]);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(prevWidgets => 
      prevWidgets.filter(widget => widget.id !== widgetId)
    );
  };

  const updateWidget = (updatedWidget: WidgetData) => {
    setWidgets(prevWidgets => 
      prevWidgets.map(widget => 
        widget.id === updatedWidget.id ? updatedWidget : widget
      )
    );
  };

  return (
    <FlexdashboardContext.Provider 
      value={{ 
        widgets, 
        addWidget, 
        removeWidget, 
        updateWidget 
      }}
    >
      {children}
    </FlexdashboardContext.Provider>
  );
}

// Custom hook for using the Flexdashboard context
export function useFlexdashboard() {
  const context = useContext(FlexdashboardContext);
  
  if (!context) {
    throw new Error('useFlexdashboard must be used within a FlexdashboardProvider');
  }
  
  return context;
}
