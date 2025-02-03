import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { 
  FlexDashboardState, 
  FlexWidget, 
  WidgetLayout, 
  UserRole 
} from '../types/dashboard.types';
import { generateUniqueId } from '@/lib/utils';

export const useFlexDashboardStore = create<FlexDashboardState>()(
  persist(
    immer((set, get) => ({
      widgets: [],
      layout: [],

      addWidget: (widget) => {
        set((state) => {
          // Ensure unique ID
          const newWidget = {
            ...widget,
            id: widget.id || generateUniqueId(),
            createdAt: new Date(),
            updatedAt: new Date()
          };

          // Add to widgets
          state.widgets.push(newWidget);

          // Create default layout if not provided
          const defaultLayout: WidgetLayout = {
            i: newWidget.id,
            x: state.layout.length % 3,
            y: Math.floor(state.layout.length / 3),
            w: 2,
            h: 2
          };

          state.layout.push(defaultLayout);
        });
      },

      removeWidget: (widgetId) => {
        set((state) => {
          // Remove widget
          state.widgets = state.widgets.filter(w => w.id !== widgetId);
          
          // Remove corresponding layout
          state.layout = state.layout.filter(l => l.i !== widgetId);
        });
      },

      updateWidgetLayout: (newLayout) => {
        set((state) => {
          state.layout = newLayout;
        });
      },

      updateWidgetConfig: (widgetId, config) => {
        set((state) => {
          const widget = state.widgets.find(w => w.id === widgetId);
          if (widget) {
            widget.config = { ...widget.config, ...config };
            widget.updatedAt = new Date();
          }
        });
      },

      getAccessibleWidgets: (userRole) => {
        const { widgets } = get();
        return widgets.filter(widget => 
          widget.allowedRoles.includes(userRole)
        );
      }
    })),
    {
      name: 'flex-dashboard-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        widgets: state.widgets,
        layout: state.layout
      })
    }
  )
);
