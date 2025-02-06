import { WidgetSize } from '../types/widget.types';

export interface WidgetDimensions {
  width: number;
  height: number;
}

export const calculateWidgetSize = (size: WidgetSize): WidgetDimensions => {
  const BASE_WIDTH = 320;  // Base width for small widgets
  const BASE_HEIGHT = 240; // Base height for small widgets

  switch (size) {
    case WidgetSize.SMALL:
      return {
        width: BASE_WIDTH,
        height: BASE_HEIGHT
      };
    case WidgetSize.MEDIUM:
      return {
        width: BASE_WIDTH * 1.5,
        height: BASE_HEIGHT
      };
    case WidgetSize.LARGE:
      return {
        width: BASE_WIDTH * 2,
        height: BASE_HEIGHT * 1.5
      };
    case WidgetSize.FULL:
      return {
        width: BASE_WIDTH * 3,
        height: BASE_HEIGHT * 2
      };
    default:
      return {
        width: BASE_WIDTH,
        height: BASE_HEIGHT
      };
  }
};

export const getGridSpan = (size: WidgetSize): { colSpan: number; rowSpan: number } => {
  switch (size) {
    case WidgetSize.SMALL:
      return { colSpan: 1, rowSpan: 1 };
    case WidgetSize.MEDIUM:
      return { colSpan: 2, rowSpan: 1 };
    case WidgetSize.LARGE:
      return { colSpan: 2, rowSpan: 2 };
    case WidgetSize.FULL:
      return { colSpan: 3, rowSpan: 2 };
    default:
      return { colSpan: 1, rowSpan: 1 };
  }
};

export const isValidWidgetSize = (size: string): boolean => {
  return Object.values(WidgetSize).includes(size as WidgetSize);
};

export const getResponsiveSize = (
  size: WidgetSize, 
  screenWidth: number
): WidgetSize => {
  // Breakpoints
  const MOBILE_BREAKPOINT = 640;
  const TABLET_BREAKPOINT = 1024;

  if (screenWidth <= MOBILE_BREAKPOINT) {
    // On mobile, all widgets become full width
    return WidgetSize.FULL;
  }

  if (screenWidth <= TABLET_BREAKPOINT) {
    // On tablet, large and full widgets become medium
    return size === WidgetSize.FULL || size === WidgetSize.LARGE 
      ? WidgetSize.MEDIUM 
      : size;
  }

  return size;
};

export const calculateWidgetMinSize = (type: string): { minW: number; minH: number } => {
  // Base sizes in grid units
  const BASE_WIDTH = 4;  // Minimum width for small widgets
  const BASE_HEIGHT = 2; // Minimum height for small widgets

  switch (type) {
    case 'chart':
    case 'graph':
      return {
        minW: BASE_WIDTH * 1.5, // Charts need more width
        minH: BASE_HEIGHT * 1.5 // and height for visibility
      };
    case 'table':
      return {
        minW: BASE_WIDTH * 2, // Tables need extra width
        minH: BASE_HEIGHT * 2 // and height for data rows
      };
    case 'stats':
      return {
        minW: BASE_WIDTH,
        minH: BASE_HEIGHT
      };
    case 'text':
      return {
        minW: BASE_WIDTH,
        minH: BASE_HEIGHT
      };
    default:
      return {
        minW: BASE_WIDTH,
        minH: BASE_HEIGHT
      };
  }
};

export const generateDynamicWidgetLayout = (
  widgets: any[], 
  containerWidth: number = 1200  // Default width if not provided
): any[] => {
  const MARGIN = 10; // pixels between widgets
  const MIN_WIDGET_WIDTH = 250; // minimum widget width in pixels
  const COLS = 12; // Standard grid layout columns
  
  // Ensure containerWidth is a valid number
  const safeContainerWidth = isNaN(containerWidth) || containerWidth <= 0 
    ? 1200 
    : containerWidth;

  // Calculate column width
  const columnWidth = Math.floor(safeContainerWidth / COLS);
  
  return widgets.map((widget, index) => {
    // Determine widget size based on type or default
    const { minW, minH } = calculateWidgetMinSize(widget.type || 'default');
    
    // Ensure numeric values
    const safeMinW = Math.max(1, Math.round(minW));
    const safeMinH = Math.max(1, Math.round(minH));
    
    // Calculate grid position
    const col = index % COLS;
    const row = Math.floor(index / COLS);
    
    return {
      ...widget,
      i: widget.id || `widget-${index}`, // Ensure unique key
      x: col,
      y: row,
      w: safeMinW,
      h: safeMinH,
      static: false // Allow movement
    };
  });
};

export const sanitizeGridLayout = (layout: any[]): any[] => {
  return layout.map(item => ({
    ...item,
    w: isNaN(item.w) || item.w <= 0 ? 2 : Math.round(item.w),
    h: isNaN(item.h) || item.h <= 0 ? 2 : Math.round(item.h),
    x: isNaN(item.x) ? 0 : Math.round(item.x),
    y: isNaN(item.y) ? 0 : Math.round(item.y)
  }));
};
