import { LayoutItem, DashboardLayout } from '../types/dashboard.types';

export const generateDefaultLayout = (
  widgetCount: number, 
  columnsPerRow = 4
): DashboardLayout => {
  const generateLayoutItems = (): LayoutItem[] => {
    return Array.from({ length: widgetCount }, (_, index) => ({
      i: `widget-${index}`,
      x: (index % columnsPerRow) * 3,
      y: Math.floor(index / columnsPerRow) * 4,
      w: 3,
      h: 4
    }));
  };

  const layoutItems = generateLayoutItems();

  return {
    lg: layoutItems,
    md: layoutItems,
    sm: layoutItems
  };
};

export const saveLayoutToLocalStorage = (layout: DashboardLayout) => {
  localStorage.setItem('flexdashboard-layout', JSON.stringify(layout));
};

export const loadLayoutFromLocalStorage = (): DashboardLayout | null => {
  const savedLayout = localStorage.getItem('flexdashboard-layout');
  return savedLayout ? JSON.parse(savedLayout) : null;
};
