import { ReactNode } from 'react';

export type WidgetType = 
  | 'chart'
  | 'statistics'
  | 'table'
  | 'kpi'
  | 'custom';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  category: string;
  component: React.ComponentType<any>;
  permissions: string[];
  data?: any;
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardLayout {
  lg: LayoutItem[];
  md: LayoutItem[];
  sm: LayoutItem[];
}

export interface BaseWidgetProps {
  id: string;
  title: string;
  children?: ReactNode;
}
