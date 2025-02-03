import { useState, useCallback } from 'react';

export function useDropdown<T = any>(initialSelectedItem?: T) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | undefined>(initialSelectedItem);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  const select = useCallback((item: T) => {
    setSelectedItem(item);
    close();
  }, [close]);

  return {
    isOpen,
    selectedItem,
    open,
    close,
    toggle,
    select
  };
}
