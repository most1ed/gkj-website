import { EChartsOption } from 'echarts';
export { chartTemplates } from '../constants/chart-templates';

export type ChartType = 'bar' | 'line' | 'pie' | 'sankey';

export interface WidgetLayout {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Widget {
  id: string;
  type: 'chart';
  title: string;
  chartType: ChartType;
  data: any;
  options: EChartsOption;
  layout?: Partial<WidgetLayout>;
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

export const CHART_CONFIGURATIONS = {
  bar: {
    defaultOptions: {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
    }
  },
  line: {
    defaultOptions: {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
    }
  },
  pie: {
    defaultOptions: {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      }
    }
  },
  sankey: {
    defaultOptions: {
      tooltip: {
        trigger: 'item'
      }
    }
  }
};

// Data conversion functions
export const convertStatistikJemaatToChartData = (data: any) => {
  // Implementation will be added based on actual data structure
  return {
    xAxis: { data: [] },
    series: [{ data: [] }]
  };
};

export const convertFinancialToChartData = (data: any) => {
  // Implementation will be added based on actual data structure
  return {
    xAxis: { data: [] },
    series: [{ data: [] }]
  };
};

export const convertServiceToChartData = (data: any) => {
  // Implementation will be added based on actual data structure
  return {
    series: [{ data: [] }]
  };
};
