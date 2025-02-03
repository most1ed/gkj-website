import { useState, useEffect } from 'react';
import { DashboardLayout } from '../types/dashboard.types';
import { 
  saveLayoutToLocalStorage, 
  loadLayoutFromLocalStorage 
} from '../utils/layoutHelpers';

export const useLayoutPersistence = (initialLayout: DashboardLayout) => {
  const [layout, setLayout] = useState<DashboardLayout>(() => {
    const savedLayout = loadLayoutFromLocalStorage();
    return savedLayout || initialLayout;
  });

  useEffect(() => {
    saveLayoutToLocalStorage(layout);
  }, [layout]);

  const updateLayout = (newLayout: DashboardLayout) => {
    setLayout(newLayout);
  };

  const resetLayout = () => {
    setLayout(initialLayout);
    localStorage.removeItem('flexdashboard-layout');
  };

  return {
    layout,
    updateLayout,
    resetLayout
  };
};
