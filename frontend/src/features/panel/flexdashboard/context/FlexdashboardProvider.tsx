import React, { createContext, useState, useContext } from 'react';
import { Widget, DashboardLayout } from '../types/dashboard.types';

interface FlexdashboardContextType {
  widgets: Widget[];
  layout: DashboardLayout;
  addWidget: (widget: Widget) => void;
  removeWidget: (widgetId: string) => void;
  updateLayout: (layout: DashboardLayout) => void;
}

const FlexdashboardContext = createContext<FlexdashboardContextType>({
  widgets: [],
  layout: { lg: [], md: [], sm: [] },
  addWidget: () => {},
  removeWidget: () => {},
  updateLayout: () => {}
});

export const FlexdashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [layout, setLayout] = useState<DashboardLayout>({
    lg: [], md: [], sm: []
  });

  const addWidget = (widget: Widget) => {
    setWidgets(prev => [...prev, widget]);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const updateLayout = (newLayout: DashboardLayout) => {
    setLayout(newLayout);
  };

  return (
    <FlexdashboardContext.Provider 
      value={{ widgets, layout, addWidget, removeWidget, updateLayout }}
    >
      {children}
    </FlexdashboardContext.Provider>
  );
};

export const useFlexdashboard = () => useContext(FlexdashboardContext);
