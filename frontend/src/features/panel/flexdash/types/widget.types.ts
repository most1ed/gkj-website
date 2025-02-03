import { ComponentType } from 'react';
import { UserRole } from '@/routes/types';

// Enum for widget categories
export enum WidgetCategory {
  OVERVIEW = 'OVERVIEW',
  FINANCIAL = 'FINANCIAL',
  MEMBERSHIP = 'MEMBERSHIP',
  EVENTS = 'EVENTS',
  MINISTRY = 'MINISTRY'
}

// Maintain WidgetSize for backward compatibility
export enum WidgetSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

// Base Widget Interface
export interface BaseWidget {
  id: string;
  title: string;
  category: WidgetCategory;
  content: string | ComponentType<any>;
  roles: UserRole[];
  size?: WidgetSize; // Optional for now
}

// Widget Template Interface
export interface WidgetTemplate extends BaseWidget {
  description: string;
  icon?: string;
  isCustomizable?: boolean;
}

// Dashboard Preset Interface
export interface DashboardPreset {
  role: UserRole;
  widgets: WidgetTemplate[];
}

// Widget Selection Props Interface
export interface WidgetSelectionProps {
  onWidgetSelect: (widget: WidgetTemplate) => void;
  availableWidgets: WidgetTemplate[];
}
