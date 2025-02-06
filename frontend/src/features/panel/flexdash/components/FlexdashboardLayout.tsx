import React, { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { 
  arrayMove, 
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

import { WidgetSelector } from './WidgetSelector';
import { DashboardWidget, WidgetData } from '../../dashboard/components/DashboardWidget';

export function FlexdashboardLayout() {
  const [widgets, setWidgets] = useState<WidgetData[]>([
    {
      id: 'widget-1',
      title: 'Kehadiran Jemaat',
      type: 'bar',
      data: [
        { name: 'Jan', value: 120 },
        { name: 'Feb', value: 150 },
        { name: 'Mar', value: 180 }
      ]
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddWidget = (newWidget: WidgetData) => {
    setWidgets([...widgets, newWidget]);
  };

  const handleDeleteWidget = (widgetId: string) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Flexibel Dashboard</h1>
        <WidgetSelector onWidgetSelect={handleAddWidget} />
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {widgets.map(widget => (
              <DashboardWidget 
                key={widget.id} 
                widget={widget} 
                onExpand={() => {}} 
                onMinimize={() => {}} 
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
