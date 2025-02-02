import { EChartsOption } from 'echarts';
import { ChartType } from '../types/chart-types';

export interface ChartTemplate {
  title: string;
  type: ChartType;
  options: EChartsOption;
}

export const chartTemplates: ChartTemplate[] = [
  {
    title: 'Statistik Jemaat',
    type: 'bar',
    options: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: []
        }
      ]
    }
  },
  {
    title: 'Laporan Keuangan',
    type: 'line',
    options: {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          data: []
        }
      ]
    }
  },
  {
    title: 'Statistik Ibadah',
    type: 'pie',
    options: {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
];
