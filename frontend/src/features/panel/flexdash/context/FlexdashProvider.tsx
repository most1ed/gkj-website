import React, { 
  createContext, 
  useState, 
  useContext, 
  ReactNode 
} from 'react';
import { 
  FlexWidget, 
  WidgetLayout, 
  WidgetCategory, 
  WidgetSize 
} from '../types/dashboard.types';
import { UserRole } from '@/types/user.types';

interface FlexdashContextType {
  widgets: FlexWidget[];
  layout: WidgetLayout[];
  addWidget: (widget: FlexWidget) => void;
  removeWidget: (widgetId: string) => void;
  updateWidgetLayout: (layout: WidgetLayout[]) => void;
  getAccessibleWidgets: (userRole: UserRole) => FlexWidget[];
}

const FlexdashContext = createContext<FlexdashContextType>({
  widgets: [],
  layout: [],
  addWidget: () => {},
  removeWidget: () => {},
  updateWidgetLayout: () => {},
  getAccessibleWidgets: () => []
});

export const FlexdashProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [widgets, setWidgets] = useState<FlexWidget[]>([]);
  const [layout, setLayout] = useState<WidgetLayout[]>([]);

  const addWidget = (widget: FlexWidget) => {
    setWidgets(prev => [...prev, widget]);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const updateWidgetLayout = (newLayout: WidgetLayout[]) => {
    setLayout(newLayout);
  };

  const getAccessibleWidgets = (userRole: UserRole) => {
    return widgets.filter(widget => 
      widget.allowedRoles.includes(userRole)
    );
  };

  return (
    <FlexdashContext.Provider 
      value={{ 
        widgets, 
        layout, 
        addWidget, 
        removeWidget, 
        updateWidgetLayout,
        getAccessibleWidgets 
      }}
    >
      {children}
    </FlexdashContext.Provider>
  );
};

export const useFlexdash = () => {
  const context = useContext(FlexdashContext);
  if (!context) {
    throw new Error('useFlexdash must be used within a FlexdashProvider');
  }
  return context;
};
