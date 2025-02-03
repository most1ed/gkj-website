import { ReactNode, ComponentType } from 'react';
import { UserRole } from '@/types/user.types';

// Enum for widget categories to help with filtering and organization
export enum WidgetCategory {
  OVERVIEW = 'OVERVIEW',
  FINANCIAL = 'FINANCIAL',
  MEMBERSHIP = 'MEMBERSHIP',
  EVENTS = 'EVENTS',
  MINISTRY = 'MINISTRY',
  CUSTOM = 'CUSTOM'
}

// Enum for widget sizes to maintain grid consistency
export enum WidgetSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE'
}

// Comprehensive Widget Interface
export interface FlexWidget {
  id: string;
  title: string;
  category: WidgetCategory;
  size: WidgetSize;
  component: ComponentType<any>;
  
  // Permissions and access control
  allowedRoles: UserRole[];
  
  // Optional configuration and data
  config?: Record<string, any>;
  data?: any;
  
  // Metadata for tracking and management
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Grid Layout Configuration
export interface WidgetLayout {
  i: string;  // Widget ID
  x: number;  // Grid X position
  y: number;  // Grid Y position
  w: number;  // Width in grid units
  h: number;  // Height in grid units
  minW?: number;  // Minimum width
  minH?: number;  // Minimum height
  maxW?: number;  // Maximum width
  maxH?: number;  // Maximum height
}

// Dashboard State Interface
export interface FlexDashboardState {
  widgets: FlexWidget[];
  layout: WidgetLayout[];
  
  // State management methods
  addWidget: (widget: FlexWidget) => void;
  removeWidget: (widgetId: string) => void;
  updateWidgetLayout: (layout: WidgetLayout[]) => void;
  updateWidgetConfig: (widgetId: string, config: Record<string, any>) => void;
  
  // Filtering and access control
  getAccessibleWidgets: (userRole: UserRole) => FlexWidget[];
}

// Widget Configuration Interface
export interface WidgetConfigOptions {
  title?: string;
  size?: WidgetSize;
  config?: Record<string, any>;
}

// Preset Widget Definition
export interface PresetWidget {
  category: WidgetCategory;
  defaultWidgets: FlexWidget[];
}

// Dashboard Preset Configurations
export interface DashboardPreset {
  name: string;
  role: UserRole;
  widgets: PresetWidget[];
}
