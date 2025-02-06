import { ChartDataPoint, ChartType } from '../types/chart-types';

export function generateRandomChartData(
  type: ChartType, 
  count: number = 5
): ChartDataPoint[] {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 
    'Nov', 'Dec'
  ];

  return Array.from({ length: count }, (_, i) => ({
    name: months[i] || `Point ${i + 1}`,
    value: Math.floor(Math.random() * 1000)
  }));
}

export function calculateTotal(data: ChartDataPoint[]): number {
  return data.reduce((sum, point) => sum + point.value, 0);
}

export function calculatePercentages(data: ChartDataPoint[]): ChartDataPoint[] {
  const total = calculateTotal(data);
  return data.map(point => ({
    name: point.name,
    value: Number(((point.value / total) * 100).toFixed(2))
  }));
}

export function sortChartData(
  data: ChartDataPoint[], 
  order: 'asc' | 'desc' = 'desc'
): ChartDataPoint[] {
  return [...data].sort((a, b) => 
    order === 'asc' 
      ? a.value - b.value 
      : b.value - a.value
  );
}

export function filterChartData(
  data: ChartDataPoint[], 
  threshold?: number
): ChartDataPoint[] {
  if (!threshold) return data;
  return data.filter(point => point.value >= threshold);
}

export const CHART_COLORS = {
  bar: [
    '#0088FE', // Blue
    '#00C49F', // Green
    '#FFBB28', // Yellow
    '#FF8042', // Orange
    '#8884D8'  // Purple
  ],
  line: [
    '#82ca9d', // Soft Green
    '#8884d8', // Purple
    '#ffc658', // Gold
    '#ff7300', // Deep Orange
    '#ff4d4d'  // Red
  ],
  pie: [
    '#B3E5FC', // Light Blue
    '#C8E6C9', // Light Green
    '#FFECB3', // Light Yellow
    '#FFCCBC', // Light Orange
    '#D1C4E9'  // Light Purple
  ]
};
