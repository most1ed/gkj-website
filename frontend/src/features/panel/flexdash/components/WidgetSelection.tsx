import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { 
  WidgetTemplate, 
  WidgetCategory,
  WidgetSelectionProps 
} from '../types/widget.types';
import { 
  Home, 
  DollarSign, 
  Users, 
  Calendar, 
  Church,
  Info 
} from 'lucide-react';

const CategoryIcons = {
  [WidgetCategory.OVERVIEW]: Home,
  [WidgetCategory.FINANCIAL]: DollarSign,
  [WidgetCategory.MEMBERSHIP]: Users,
  [WidgetCategory.EVENTS]: Calendar,
  [WidgetCategory.MINISTRY]: Church
};

export const WidgetSelection: React.FC<WidgetSelectionProps> = ({ 
  onWidgetSelect, 
  availableWidgets 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<WidgetCategory | null>(null);

  // Group widgets by category
  const widgetsByCategory = availableWidgets.reduce((acc, widget) => {
    if (!acc[widget.category]) {
      acc[widget.category] = [];
    }
    acc[widget.category].push(widget);
    return acc;
  }, {} as Record<WidgetCategory, WidgetTemplate[]>);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pilih Widget Dashboard</h2>

      {/* Category Selection */}
      <div className="flex space-x-2 mb-4">
        {Object.keys(widgetsByCategory).map((category) => {
          const CategoryIcon = CategoryIcons[category as WidgetCategory];
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category as WidgetCategory)}
            >
              {CategoryIcon && <CategoryIcon className="mr-2 h-4 w-4" />}
              {category}
            </Button>
          );
        })}
      </div>

      {/* Widget List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(selectedCategory 
          ? widgetsByCategory[selectedCategory] 
          : Object.values(widgetsByCategory).flat()
        ).map((widget) => (
          <Card key={widget.id} className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                {widget.icon && (
                  <span className="mr-2">
                    {React.createElement(CategoryIcons[widget.icon as WidgetCategory] || Info, { className: 'h-5 w-5' })}
                  </span>
                )}
                {widget.title}
              </CardTitle>
              <CardDescription>{widget.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Ukuran: {widget.size}
                </span>
                <Button 
                  size="sm" 
                  onClick={() => onWidgetSelect(widget)}
                  disabled={!widget.isCustomizable}
                >
                  {widget.isCustomizable ? 'Tambah' : 'Tidak Dapat Ditambahkan'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCategory && Object.values(widgetsByCategory[selectedCategory]).length === 0 && (
        <div className="text-center text-muted-foreground mt-4">
          Tidak ada widget tersedia untuk kategori ini.
        </div>
      )}
    </div>
  );
};
