import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  BaseWidget, 
  CreateWidgetDTO, 
  WidgetLayout,
  WidgetTemplate 
} from '@/features/panel/flexdash/types/widget.types';
import { UserRole } from '@/routes/types';

interface FlexDashboardState {
  widgets: BaseWidget[];
  addWidget: (widget: CreateWidgetDTO) => void;
  removeWidget: (widgetId: string) => void;
  updateWidgetLayout: (widgetId: string, layout: WidgetLayout) => void;
  updateWidgetContent: (widgetId: string, content: Partial<WidgetTemplate>) => void;
}

export const useFlexDashboardStore = create<FlexDashboardState>(
  persist(
    (set, get) => ({
      widgets: [],

      addWidget: (widget) => {
        set((state) => ({
          widgets: [...state.widgets, widget]
        }));
      },

      removeWidget: (widgetId) => {
        set((state) => ({
          widgets: state.widgets.filter(w => w.id !== widgetId)
        }));
      },

      updateWidgetLayout: (widgetId, layout) => {
        set((state) => ({
          widgets: state.widgets.map(widget => 
            widget.id === widgetId 
              ? { ...widget, layout } 
              : widget
          )
        }));
      },

      updateWidgetContent: (widgetId, content) => {
        set((state) => ({
          widgets: state.widgets.map(widget => 
            widget.id === widgetId 
              ? { ...widget, ...content } 
              : widget
          )
        }));
      }
    }),
    {
      name: 'flex-dashboard-storage',
      partialize: (state) => ({ widgets: state.widgets })
    }
  )
);
