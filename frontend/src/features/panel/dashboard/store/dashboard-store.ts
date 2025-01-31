import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { 
  DashboardState, 
  DashboardWidget, 
  ChartType 
} from '../types/chart-types';
import { generateRandomChartData, generateChartOptions } from '../utils/chart-utils';
import { 
  findNextAvailablePosition, 
  validateAndAdjustPosition,
  GRID_CONFIG 
} from '../utils/grid-utils';

// Utility function to get current theme
const getCurrentTheme = (): 'light' | 'dark' => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

export const useDashboardStore = create<DashboardState>((set) => ({
  widgets: [],
  
  addWidget: (widget) => set((state) => {
    const theme = getCurrentTheme();
    
    // Find next available position
    const layout = findNextAvailablePosition(state.widgets);
    
    const newWidget: DashboardWidget = {
      ...widget,
      id: widget.id || uuidv4(),
      data: widget.data || generateRandomChartData(widget.type),
      options: generateChartOptions(
        widget.type, 
        widget.data || generateRandomChartData(widget.type), 
        widget.title, 
        theme
      ),
      layout: {
        ...layout,
        w: widget.layout?.w || GRID_CONFIG.DEFAULT_WIDGET_WIDTH,
        h: widget.layout?.h || GRID_CONFIG.DEFAULT_WIDGET_HEIGHT
      }
    };
    
    return { 
      widgets: [...state.widgets, newWidget] 
    };
  }),
  
  removeWidget: (id) => set((state) => ({
    widgets: state.widgets.filter(widget => widget.id !== id)
  })),
  
  updateWidget: (id, updates) => set((state) => {
    const theme = getCurrentTheme();
    
    return {
      widgets: state.widgets.map(widget => {
        if (widget.id !== id) return widget;
        
        // If layout is being updated, validate the new position
        const newLayout = updates.layout 
          ? validateAndAdjustPosition(
              { ...widget.layout, ...updates.layout }, 
              state.widgets.filter(w => w.id !== id)
            )
          : widget.layout;
        
        return { 
          ...widget, 
          ...updates,
          layout: newLayout,
          options: updates.data 
            ? generateChartOptions(
                widget.type, 
                updates.data, 
                widget.title, 
                theme
              )
            : widget.options
        };
      })
    };
  }),

  // New method to configure widget details
  configureWidget: (id, configuration) => set((state) => ({
    widgets: state.widgets.map(widget => 
      widget.id === id 
        ? { 
            ...widget, 
            ...configuration,
            data: configuration.data || widget.data,
            options: configuration.data
              ? generateChartOptions(
                  widget.type, 
                  configuration.data, 
                  widget.title, 
                  getCurrentTheme()
                )
              : widget.options
          }
        : widget
    )
  }))
}));