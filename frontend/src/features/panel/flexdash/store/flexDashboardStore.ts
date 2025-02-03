import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '@/routes/types';
import { BaseWidget, WidgetTemplate } from '../types/widget.types';
import { WidgetManager } from '../utils/widgetHelpers';

interface FlexDashboardState {
  widgets: BaseWidget[];
  addWidget: (widget: WidgetTemplate) => void;
  removeWidget: (widgetId: string) => void;
  clearWidgets: () => void;
  setWidgetsForRole: (role: UserRole) => void;
}

export const useFlexDashboardStore = create<FlexDashboardState>()(
  persist(
    (set, get) => ({
      widgets: [],
      
      addWidget: (widget) => {
        set((state) => {
          // Prevent duplicate widgets by checking title
          const isDuplicate = state.widgets.some(
            w => w.title.toLowerCase() === widget.title.toLowerCase()
          );

          if (isDuplicate) {
            return state;
          }

          const newWidget: BaseWidget = {
            ...widget,
            id: `widget-${Date.now()}`, // Unique ID
            createdAt: new Date().toISOString()
          };

          return {
            widgets: [...state.widgets, newWidget]
          };
        });
      },

      removeWidget: (widgetId) => {
        set((state) => ({
          widgets: state.widgets.filter(widget => widget.id !== widgetId)
        }));
      },

      clearWidgets: () => {
        set({ widgets: [] });
      },

      setWidgetsForRole: (role: UserRole) => {
        set((state) => {
          // Get default widgets for the role
          const roleWidgets = WidgetManager.getWidgetsForRole(role);
          
          // Merge existing widgets with role-specific widgets
          const mergedWidgets = [
            ...state.widgets,
            ...roleWidgets.filter(
              roleWidget => !state.widgets.some(
                existingWidget => existingWidget.title === roleWidget.title
              )
            )
          ];

          return { widgets: mergedWidgets };
        });
      }
    }),
    {
      name: 'flex-dashboard-storage', // Unique name for storage
      partialize: (state) => ({ widgets: state.widgets }) // Only persist widgets
    }
  )
);
