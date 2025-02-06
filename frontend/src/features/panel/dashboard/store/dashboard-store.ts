import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types for dashboard state
export interface DashboardWidget {
  id: string;
  type: 'chart' | 'statistic' | 'table';
  title: string;
  data: any[];
  layout?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface DashboardState {
  widgets: DashboardWidget[];
  addWidget: (widget: DashboardWidget) => void;
  removeWidget: (widgetId: string) => void;
  updateWidget: (widget: DashboardWidget) => void;
  reorderWidgets: (newOrder: DashboardWidget[]) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: [],
      addWidget: (widget) => 
        set((state) => ({ 
          widgets: [...state.widgets, { 
            ...widget, 
            id: `widget-${Date.now()}` 
          }] 
        })),
      removeWidget: (widgetId) => 
        set((state) => ({ 
          widgets: state.widgets.filter(w => w.id !== widgetId) 
        })),
      updateWidget: (updatedWidget) => 
        set((state) => ({ 
          widgets: state.widgets.map(w => 
            w.id === updatedWidget.id ? updatedWidget : w
          ) 
        })),
      reorderWidgets: (newOrder) => 
        set({ widgets: newOrder })
    }),
    {
      name: 'dashboard-storage',
      version: 1,
    }
  )
);
