import { useState, useCallback } from 'react';
import { Component, ComponentType } from '../types/page';

interface DragAndDropHook {
  isDragging: boolean;
  draggedComponent: Component | null;
  handleDragStart: (component: Component) => void;
  handleDragEnd: () => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

export const useDragAndDrop = (): DragAndDropHook => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);

  const handleDragStart = useCallback((component: Component) => {
    setIsDragging(true);
    setDraggedComponent(component);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDraggedComponent(null);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Allow dropping
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // Here you would typically update the page layout
    // with the dropped component's new position
    setIsDragging(false);
    setDraggedComponent(null);
  }, []);

  return {
    isDragging,
    draggedComponent,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  };
};
