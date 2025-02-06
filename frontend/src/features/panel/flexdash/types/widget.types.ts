import { ComponentType } from 'react';

// Enum for widget categories
export enum WidgetCategory {
  OVERVIEW = 'OVERVIEW',
  FINANCIAL = 'FINANCIAL',
  MEMBERSHIP = 'MEMBERSHIP',
  EVENT = 'EVENT',
  ATTENDANCE_TREND = 'ATTENDANCE_TREND',
  MINISTRY = 'MINISTRY',
  DONATION_DISTRIBUTION = 'DONATION_DISTRIBUTION',
  AGE_DISTRIBUTION = 'AGE_DISTRIBUTION',
  GENDER_DISTRIBUTION = 'GENDER_DISTRIBUTION',
  SETTINGS = 'SETTINGS',
  BUDGET = 'BUDGET',
  TASK_MANAGEMENT = 'TASK_MANAGEMENT',
  MEDIA_LIBRARY = 'MEDIA_LIBRARY',
  DOCUMENT_MANAGEMENT = 'DOCUMENT_MANAGEMENT',
  PROFILE_INSIGHTS = 'PROFILE_INSIGHTS'
}

// Enum for visualization types
export enum VisualizationType {
  // Chart Types
  BAR_CHART = 'BAR_CHART',
  LINE_CHART = 'LINE_CHART',
  PIE_CHART = 'PIE_CHART',
  AREA_CHART = 'AREA_CHART',
  SCATTER_PLOT = 'SCATTER_PLOT',
  
  // Table and List Types
  TABLE = 'TABLE',
  LIST = 'LIST',
  
  // Specialized Visualizations
  HEATMAP = 'HEATMAP',
  DONUT_CHART = 'DONUT_CHART',
  GAUGE = 'GAUGE',
  TREEMAP = 'TREEMAP',
  
  // Geographic Visualizations
  MAP = 'MAP'
}

// Enum for data sources
export enum DataSource {
  // Financial Data Sources
  FINANCIAL = 'FINANCIAL',
  
  // Membership Data Sources
  MEMBERSHIP = 'MEMBERSHIP',
  
  // Attendance Data Sources
  ATTENDANCE = 'ATTENDANCE',
  
  // Events and Activities
  EVENTS = 'EVENTS',
  
  // Ministry-related Data
  MINISTRY = 'MINISTRY',
  DONATIONS = 'DONATIONS',
  MINISTRY_PROGRESS = 'MINISTRY_PROGRESS'
}

// Enum for widget sizes
export enum WidgetSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE'
}

// Enum for user roles
export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  TREASURER = 'TREASURER',
  PASTOR = 'PASTOR',
  VOLUNTEER = 'VOLUNTEER'
}

// Enum for widget visibility
export enum WidgetVisibilityType {
  PRIVATE = 'PRIVATE',
  SHARED = 'SHARED',
  PUBLIC = 'PUBLIC'
}

// Data configuration for dynamic widgets
export interface DataConfig {
  source: DataSource;
  fields: string[];
  filters?: Record<string, any>;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Visualization configuration
export interface VisualizationConfig {
  type: VisualizationType;
  options?: Record<string, any>;
}

// Enhanced Widget Template Interface
export interface WidgetTemplate {
  id: string;
  title: string;
  description?: string;
  category: WidgetCategory;
  roles: UserRole[];
  dataConfig: DataConfig;
  visualizationConfig: VisualizationConfig;
  icon?: string;
  isCustomizable?: boolean;
  size?: WidgetSize;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

// Custom Widget Template Interface
export interface CustomWidgetTemplate {
  id: string;
  name: string;
  description?: string;
  category: WidgetCategory;
  icon?: string;
  dataSource?: string;
  visualizationType?: 'chart' | 'table' | 'metric' | 'custom';
  defaultConfig: Record<string, any>;
  createdBy: string;
  createdAt: Date;
  isPublic?: boolean;
  tags?: string[];
}

// Base Widget Interface
export interface BaseWidget {
  id: string;
  title: string;
  category: WidgetCategory;
  size?: WidgetSize;
  layout?: WidgetLayout;
  content: string | ComponentType<any>;
  roles: UserRole[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

// Widget Layout Interface
export interface WidgetLayout {
  i: string;  // Widget ID
  x: number;  // X position
  y: number;  // Y position
  w: number;  // Width
  h: number;  // Height
  minW?: number;
  minH?: number;
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

// Comprehensive Flex Dashboard State
export interface FlexDashboardState {
  widgets: BaseWidget[];
  layout: WidgetLayout[];
  addWidget: (widget: WidgetTemplate) => void;
  removeWidget: (widgetId: string) => void;
  updateWidgetLayout: (newLayout: WidgetLayout[]) => void;
  updateWidgetConfig?: (widgetId: string, config: Partial<BaseWidget>) => void;
  getAccessibleWidgets?: (userRole: UserRole) => BaseWidget[];
  setWidgetsForRole: (role: UserRole, presetWidgets?: WidgetTemplate[]) => void;
}

// Create Custom Widget DTO
export interface CreateCustomWidgetDTO {
  name: string;
  description?: string;
  category: WidgetCategory;
  icon?: string;
  dataSource?: string;
  visualizationType: 'chart' | 'table' | 'metric' | 'custom';
  defaultConfig: Record<string, any>;
  visibility: WidgetVisibilityType;
  tags?: string[];
}

// Widget Management Interfaces
export interface CreateWidgetDTO extends BaseWidget {
  // Additional properties for widget creation if needed
}

export interface UpdateWidgetDTO extends Partial<Omit<WidgetTemplate, 'id'>> {}

export interface WidgetManagerInterface {
  createWidget(widget: CreateWidgetDTO): Promise<WidgetTemplate>;
  updateWidget(id: string, updates: UpdateWidgetDTO): Promise<WidgetTemplate>;
  deleteWidget(id: string): Promise<void>;
  getWidgetById(id: string): WidgetTemplate | undefined;
  getAllWidgets(): WidgetTemplate[];
  getWidgetsByCategory(category: WidgetCategory): WidgetTemplate[];
  getWidgetsByRole(role: UserRole): Promise<WidgetTemplate[]>;
}
