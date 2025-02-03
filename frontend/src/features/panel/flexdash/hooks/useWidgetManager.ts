import { useState } from 'react';
import { FlexWidget } from '../types/dashboard.types';
import { WidgetRegistry } from '../utils/widgetRegistry';

export const useWidgetManager = () => {
  const [widgets, setWidgets] = useState<FlexWidget[]>(WidgetRegistry.getAllWidgets());

  const addWidget = (widget: FlexWidget) => {
    WidgetRegistry.registerWidget(widget);
    setWidgets(WidgetRegistry.getAllWidgets());
  };

  const removeWidget = (widgetId: string) => {
    WidgetRegistry.removeWidget(widgetId);
    setWidgets(WidgetRegistry.getAllWidgets());
  };

  const getWidgetsByCategory = (category: string) => {
    return widgets.filter(widget => widget.category.toString() === category);
  };

  return {
    widgets,
    addWidget,
    removeWidget,
    getWidgetsByCategory
  };
};
