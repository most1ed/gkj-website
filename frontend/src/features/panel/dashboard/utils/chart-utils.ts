import { EChartsOption } from 'echarts';
import { ChartType } from '../types/chart-types';

export const generateChartOptions = (
  type: ChartType, 
  data: any, 
  title: string,
  theme: 'light' | 'dark' = 'light'
): EChartsOption => {
  const isDark = theme === 'dark';

  const baseOptions: EChartsOption = {
    title: { text: title },
    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    textStyle: {
      color: isDark ? '#ffffff' : '#000000'
    }
  };

  switch (type) {
    case 'bar':
      return {
        ...baseOptions,
        xAxis: { type: 'category', data: data.categories },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: data.values,
          itemStyle: {
            color: isDark ? '#3182ce' : '#4299e1'
          }
        }]
      };
    
    case 'line':
      return {
        ...baseOptions,
        xAxis: { type: 'category', data: data.categories },
        yAxis: { type: 'value' },
        series: [{
          type: 'line',
          data: data.values,
          lineStyle: {
            color: isDark ? '#48bb78' : '#38b2ac'
          }
        }]
      };
    
    case 'pie':
      return {
        ...baseOptions,
        series: [{
          type: 'pie',
          data: data.map((item: any) => ({
            value: item.value,
            name: item.name
          })),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
    
    case 'sankey':
      return {
        ...baseOptions,
        series: [{
          type: 'sankey',
          data: data.nodes,
          links: data.links
        }]
      };
    
    default:
      return baseOptions;
  }
};

export const generateRandomChartData = (type: ChartType) => {
  switch (type) {
    case 'bar':
    case 'line':
      return {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        values: [120, 200, 150, 80, 70]
      };
    
    case 'pie':
      return [
        { name: 'Category A', value: 335 },
        { name: 'Category B', value: 310 },
        { name: 'Category C', value: 234 }
      ];
    
    case 'sankey':
      return {
        nodes: [
          { name: 'Source A' },
          { name: 'Source B' },
          { name: 'Destination X' },
          { name: 'Destination Y' }
        ],
        links: [
          { source: 'Source A', target: 'Destination X', value: 5 },
          { source: 'Source B', target: 'Destination Y', value: 3 }
        ]
      };
    
    default:
      return null;
  }
};
