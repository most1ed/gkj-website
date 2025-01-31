import { EChartsOption } from 'echarts';

export type ChartType = 'bar' | 'line' | 'pie' | 'sankey';

export interface WidgetLayout {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardWidget {
  id: string;
  type: ChartType;
  title: string;
  data: any;
  options: EChartsOption;
  layout: WidgetLayout;
  configuration?: Record<string, any>;
}

export interface WidgetConfiguration {
  title?: string;
  data?: any;
  options?: Partial<EChartsOption>;
  layout?: Partial<WidgetLayout>;
  configuration?: Record<string, any>;
}

export interface DashboardState {
  widgets: DashboardWidget[];
  addWidget: (widget: Partial<DashboardWidget>) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, updates: Partial<DashboardWidget>) => void;
  configureWidget: (id: string, configuration: WidgetConfiguration) => void;
}
