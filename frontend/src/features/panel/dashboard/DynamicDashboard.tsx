import React, { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove, 
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  SortableContext,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface WidgetProps {
  id: string;
  title: string;
  type: 'bar' | 'pie';
  data: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function SortableWidget({ widget, onDelete }: { widget: WidgetProps, onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle {...listeners} className="cursor-move">
            {widget.title}
          </CardTitle>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete(widget.id)}
          >
            Hapus
          </Button>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            {widget.type === 'bar' ? (
              <BarChart data={widget.data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={widget.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {widget.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DynamicDashboard() {
  const [widgets, setWidgets] = useState<WidgetProps[]>([
    {
      id: '1',
      title: 'Kehadiran Jemaat',
      type: 'bar',
      data: [
        { name: 'Jan', value: 120 },
        { name: 'Feb', value: 150 },
        { name: 'Mar', value: 180 }
      ]
    },
    {
      id: '2',
      title: 'Persembahan per Kategori',
      type: 'pie',
      data: [
        { name: 'Umum', value: 50000000 },
        { name: 'Misi', value: 20000000 },
        { name: 'Pembangunan', value: 30000000 }
      ]
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDeleteWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  const handleAddWidget = () => {
    const newWidget: WidgetProps = {
      id: `${widgets.length + 1}`,
      title: `Widget Baru ${widgets.length + 1}`,
      type: Math.random() > 0.5 ? 'bar' : 'pie',
      data: [
        { name: 'Data 1', value: Math.random() * 100 },
        { name: 'Data 2', value: Math.random() * 100 },
        { name: 'Data 3', value: Math.random() * 100 }
      ]
    };
    setWidgets([...widgets, newWidget]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard Dinamis</h1>
        <Button onClick={handleAddWidget}>Tambah Widget</Button>
      </div>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {widgets.map(widget => (
              <SortableWidget 
                key={widget.id} 
                widget={widget} 
                onDelete={handleDeleteWidget}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
