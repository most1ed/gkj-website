import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  LineChart, 
  PieChart, 
  Plus 
} from 'lucide-react';
import { WidgetData, WidgetType } from './DashboardWidget';

interface WidgetSelectorProps {
  onWidgetSelect: (widget: WidgetData) => void;
}

const widgetTemplates: Record<WidgetType, WidgetData> = {
  bar: {
    id: '',
    title: 'Bar Chart',
    type: 'bar',
    data: [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 200 },
      { name: 'Apr', value: 278 },
      { name: 'May', value: 189 }
    ],
    description: 'Perbandingan data dalam bentuk batang'
  },
  line: {
    id: '',
    title: 'Line Chart',
    type: 'line',
    data: [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 200 },
      { name: 'Apr', value: 278 },
      { name: 'May', value: 189 }
    ],
    description: 'Tren perubahan data dari waktu ke waktu'
  },
  pie: {
    id: '',
    title: 'Pie Chart',
    type: 'pie',
    data: [
      { name: 'Kategori A', value: 400 },
      { name: 'Kategori B', value: 300 },
      { name: 'Kategori C', value: 300 }
    ],
    description: 'Distribusi proporsi dalam satu set data'
  }
};

export function WidgetSelector({ onWidgetSelect }: WidgetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWidgetSelect = (type: WidgetType) => {
    const newWidget: WidgetData = {
      ...widgetTemplates[type],
      id: `widget-${Date.now()}` // Generate unique ID
    };
    onWidgetSelect(newWidget);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Tambah Widget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih Jenis Widget</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 pt-4">
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-4 h-32"
            onClick={() => handleWidgetSelect('bar')}
          >
            <BarChart2 className="h-8 w-8 mb-2" />
            Bar Chart
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-4 h-32"
            onClick={() => handleWidgetSelect('line')}
          >
            <LineChart className="h-8 w-8 mb-2" />
            Line Chart
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-4 h-32"
            onClick={() => handleWidgetSelect('pie')}
          >
            <PieChart className="h-8 w-8 mb-2" />
            Pie Chart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
