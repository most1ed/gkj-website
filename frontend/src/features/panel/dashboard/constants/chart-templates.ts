// Chart color palettes
export const COLOR_PALETTES = {
  default: [
    '#0088FE', // Blue
    '#00C49F', // Green
    '#FFBB28', // Yellow
    '#FF8042', // Orange
    '#8884D8'  // Purple
  ],
  pastel: [
    '#B3E5FC', // Light Blue
    '#C8E6C9', // Light Green
    '#FFECB3', // Light Yellow
    '#FFCCBC', // Light Orange
    '#D1C4E9'  // Light Purple
  ],
  monochrome: {
    blue: [
      '#E3F2FD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5'
    ],
    green: [
      '#E8F5E9',
      '#C8E6C9',
      '#A5D6A7',
      '#81C784',
      '#66BB6A'
    ]
  }
};

// Chart type configurations
export const CHART_TYPES = {
  bar: {
    defaultProps: {
      barSize: 30,
      maxBarSize: 50
    }
  },
  line: {
    defaultProps: {
      strokeWidth: 2,
      dot: { r: 4 }
    }
  },
  pie: {
    defaultProps: {
      innerRadius: '40%',
      outerRadius: '70%',
      paddingAngle: 2
    }
  }
};

// Default chart options
export const DEFAULT_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: 'easeOutQuart'
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 20,
        usePointStyle: true
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  }
};

// Utility functions for chart data transformation
export function normalizeChartData(
  data: any[], 
  valueKey: string = 'value', 
  labelKey: string = 'name'
) {
  return data.map(item => ({
    name: item[labelKey],
    value: Number(item[valueKey])
  }));
}

export function calculatePercentages(data: any[], valueKey: string = 'value') {
  const total = data.reduce((sum, item) => sum + item[valueKey], 0);
  return data.map(item => ({
    ...item,
    percentage: ((item[valueKey] / total) * 100).toFixed(2)
  }));
}
