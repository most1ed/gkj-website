import { useState } from 'react';
import { Widget } from '../types/dashboard.types';
import { WidgetRegistry } from '../utils/widgetRegistry';

export const useWidgetManager = () => {
  const [widgets, setWidgets] = useState<Widget[]>(WidgetRegistry.getAllWidgets());

  const addWidget = (widget: Widget) => {
    WidgetRegistry.registerWidget(widget);
    setWidgets(WidgetRegistry.getAllWidgets());
  };

  const removeWidget = (widgetId: string) => {
    WidgetRegistry.removeWidget(widgetId);
    setWidgets(WidgetRegistry.getAllWidgets());
  };

  const getWidgetsByType = (type: string) => {
    return widgets.filter(widget => widget.type === type);
  };

  return {
    widgets,
    addWidget,
    removeWidget,
    getWidgetsByType
  };
};
