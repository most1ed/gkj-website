import { DashboardWidget } from '../types/chart-types';

export const GRID_CONFIG = {
  CELL_SIZE: 50,
  MAX_COLUMNS: 12,
  MAX_ROWS: 8,
  DEFAULT_WIDGET_WIDTH: 4,
  DEFAULT_WIDGET_HEIGHT: 4
};

export interface GridPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function isPositionOccupied(
  newPosition: GridPosition, 
  existingWidgets: DashboardWidget[]
): boolean {
  return existingWidgets.some(widget => {
    const existingPos = widget.layout;
    return !(
      newPosition.x + newPosition.w <= existingPos.x ||
      newPosition.x >= existingPos.x + existingPos.w ||
      newPosition.y + newPosition.h <= existingPos.y ||
      newPosition.y >= existingPos.y + existingPos.h
    );
  });
}

export function findNextAvailablePosition(
  existingWidgets: DashboardWidget[], 
  desiredWidth = GRID_CONFIG.DEFAULT_WIDGET_WIDTH, 
  desiredHeight = GRID_CONFIG.DEFAULT_WIDGET_HEIGHT
): GridPosition {
  for (let y = 0; y < GRID_CONFIG.MAX_ROWS - desiredHeight; y++) {
    for (let x = 0; x < GRID_CONFIG.MAX_COLUMNS - desiredWidth; x++) {
      const potentialPosition = { x, y, w: desiredWidth, h: desiredHeight };
      
      if (!isPositionOccupied(potentialPosition, existingWidgets)) {
        return potentialPosition;
      }
    }
  }

  // Fallback if no position found
  return { 
    x: 0, 
    y: existingWidgets.length, 
    w: desiredWidth, 
    h: desiredHeight 
  };
}

export function validateAndAdjustPosition(
  newPosition: GridPosition, 
  existingWidgets: DashboardWidget[]
): GridPosition {
  // Ensure position is within grid bounds
  const constrainedX = Math.max(0, Math.min(newPosition.x, GRID_CONFIG.MAX_COLUMNS - newPosition.w));
  const constrainedY = Math.max(0, Math.min(newPosition.y, GRID_CONFIG.MAX_ROWS - newPosition.h));

  const adjustedPosition = { 
    ...newPosition, 
    x: constrainedX, 
    y: constrainedY 
  };

  // If the position is occupied, find the next available position
  if (isPositionOccupied(adjustedPosition, existingWidgets)) {
    return findNextAvailablePosition(existingWidgets, newPosition.w, newPosition.h);
  }

  return adjustedPosition;
}
