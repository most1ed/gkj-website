import { Responsive, WidthProvider } from 'react-grid-layout';
import { useFlexdashboard } from '../context/FlexdashboardProvider';
import { DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { 
  arrayMove, 
  rectSortingStrategy, 
  SortableContext 
} from '@dnd-kit/sortable';

const ResponsiveGridLayout = WidthProvider(Responsive);

const FlexdashboardPage: React.FC = () => {
  const { widgets, layout, addWidget, removeWidget, updateLayout } = useFlexdashboard();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = widgets.findIndex(w => w.id === active.id);
      const newIndex = widgets.findIndex(w => w.id === over?.id);

      const reorderedWidgets = arrayMove(widgets, oldIndex, newIndex);
      // Update widgets order if needed
    }
  };

  return (
    <div className="flex-dashboard p-4">
      <DndContext 
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext 
          items={widgets.map(w => w.id)}
          strategy={rectSortingStrategy}
        >
          <ResponsiveGridLayout
            className="layout"
            layouts={layout}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
            onLayoutChange={(currentLayout) => {
              updateLayout({
                lg: currentLayout,
                md: currentLayout,
                sm: currentLayout
              });
            }}
          >
            {widgets.map(widget => (
              <div key={widget.id}>
                <widget.component 
                  id={widget.id} 
                  title={widget.title} 
                />
              </div>
            ))}
          </ResponsiveGridLayout>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default FlexdashboardPage;
