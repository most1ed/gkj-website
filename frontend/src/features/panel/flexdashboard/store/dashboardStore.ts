import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Widget, DashboardLayout } from '../types/dashboard.types';

interface DashboardState {
  widgets: Widget[];
  layout: DashboardLayout;
  addWidget: (widget: Widget) => void;
  removeWidget: (widgetId: string) => void;
  updateLayout: (layout: DashboardLayout) => void;
}

export const useDashboardStore = create(
  persist<DashboardState>(
    (set) => ({
      widgets: [],
      layout: { lg: [], md: [], sm: [] },
      
      addWidget: (widget) => set((state) => ({
        widgets: [...state.widgets, widget]
      })),
      
      removeWidget: (widgetId) => set((state) => ({
        widgets: state.widgets.filter(w => w.id !== widgetId)
      })),
      
      updateLayout: (layout) => set({ layout })
    }),
    {
      name: 'flexdashboard-storage',
      getStorage: () => localStorage
    }
  )
);
