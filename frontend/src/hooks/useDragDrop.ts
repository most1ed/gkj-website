import { useState, useCallback } from 'react';

export interface DragItem {
  id: string;
  type: string;
}

export function useDragDrop<T extends DragItem>(initialItems: T[] = []) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [draggedItem, setDraggedItem] = useState<T | null>(null);

  const onDragStart = useCallback((item: T) => {
    setDraggedItem(item);
  }, []);

  const onDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  const moveItem = useCallback((sourceIndex: number, targetIndex: number) => {
    const updatedItems = [...items];
    const [reorderedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(targetIndex, 0, reorderedItem);
    setItems(updatedItems);
  }, [items]);

  const dropItem = useCallback((targetItem: T) => {
    if (!draggedItem) return;

    const sourceIndex = items.findIndex(item => item.id === draggedItem.id);
    const targetIndex = items.findIndex(item => item.id === targetItem.id);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      moveItem(sourceIndex, targetIndex);
    }

    setDraggedItem(null);
  }, [draggedItem, items, moveItem]);

  return {
    items,
    draggedItem,
    onDragStart,
    onDragEnd,
    moveItem,
    dropItem,
    setItems
  };
}
