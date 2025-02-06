export type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'scatter';

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface ChartConfig {
  type: ChartType;
  title: string;
  xAxis?: string;
  yAxis?: string;
  data: ChartDataPoint[];
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  scales?: {
    x?: any;
    y?: any;
  };
  plugins?: {
    legend?: {
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    tooltip?: any;
  };
}

export const DEFAULT_CHART_OPTIONS: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};
