import React, { useState, useEffect } from 'react';
import { 
  WidgetTemplate, 
  WidgetCategory, 
  DataSource, 
  VisualizationType,
  CreateWidgetDTO,
  UpdateWidgetDTO 
} from '../types/widget.types';
import { UserRole } from '@/routes/types';
import { widgetManager } from '../utils/widgetManager';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from '@/components/ui/Toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Pencil, Trash2, Plus } from 'lucide-react';

export const WidgetSelection: React.FC = () => {
  // State for creating new widget
  const [selectedCategory, setSelectedCategory] = useState<WidgetCategory | null>(null);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null);
  const [selectedVisualization, setSelectedVisualization] = useState<VisualizationType | null>(null);
  const [widgetTitle, setWidgetTitle] = useState('');

  // State for managing widgets
  const [widgets, setWidgets] = useState<WidgetTemplate[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<WidgetTemplate | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch widgets on component mount
  useEffect(() => {
    refreshWidgets();
  }, []);

  // Refresh widgets list
  const refreshWidgets = () => {
    const currentWidgets = widgetManager.getAllWidgets();
    setWidgets(currentWidgets);
  };

  // Create Widget Handler
  const handleCreateWidget = () => {
    if (!selectedCategory || !selectedDataSource || !selectedVisualization || !widgetTitle) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    const newWidget: CreateWidgetDTO = {
      title: widgetTitle,
      category: selectedCategory,
      roles: [UserRole.ADMIN],
      dataConfig: {
        source: selectedDataSource,
        fields: []
      },
      visualizationConfig: {
        type: selectedVisualization
      },
      isCustomizable: true
    };

    try {
      widgetManager.createWidget(newWidget);
      refreshWidgets();
      
      // Reset form
      setSelectedCategory(null);
      setSelectedDataSource(null);
      setSelectedVisualization(null);
      setWidgetTitle('');
      setIsCreateModalOpen(false);

      toast({
        title: 'Widget Created',
        description: 'New widget successfully added',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Creation Failed',
        description: 'Could not create widget',
        variant: 'destructive'
      });
    }
  };

  // Edit Widget Handler
  const handleEditWidget = () => {
    if (!selectedWidget) return;

    const updateData: UpdateWidgetDTO = {
      title: selectedWidget.title,
      category: selectedWidget.category,
      dataConfig: selectedWidget.dataConfig,
      visualizationConfig: selectedWidget.visualizationConfig
    };

    try {
      widgetManager.updateWidget(selectedWidget.id, updateData);
      refreshWidgets();
      setIsEditModalOpen(false);

      toast({
        title: 'Widget Updated',
        description: 'Widget successfully modified',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Could not update widget',
        variant: 'destructive'
      });
    }
  };

  // Delete Widget Handler
  const handleDeleteWidget = () => {
    if (!selectedWidget) return;

    try {
      widgetManager.deleteWidget(selectedWidget.id);
      refreshWidgets();
      setIsDeleteModalOpen(false);

      toast({
        title: 'Widget Deleted',
        description: 'Widget successfully removed',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Deletion Failed',
        description: 'Could not delete widget',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Widget Management</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Widget
        </Button>
      </div>

      {/* Widget List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((widget) => (
          <Card key={widget.id} className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>{widget.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>{widget.category}</span>
                <div className="space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedWidget(widget);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => {
                      setSelectedWidget(widget);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Widget Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Widget</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Widget Title"
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
            />
            <Select 
              value={selectedCategory || ''} 
              onValueChange={(value) => setSelectedCategory(value as WidgetCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(WidgetCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={selectedDataSource || ''} 
              onValueChange={(value) => setSelectedDataSource(value as DataSource)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Data Source" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(DataSource).map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={selectedVisualization || ''} 
              onValueChange={(value) => setSelectedVisualization(value as VisualizationType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Visualization" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(VisualizationType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateWidget}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Widget Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Widget</DialogTitle>
          </DialogHeader>
          {selectedWidget && (
            <div className="space-y-4">
              <Input 
                placeholder="Widget Title"
                value={selectedWidget.title}
                onChange={(e) => setSelectedWidget(prev => prev ? {...prev, title: e.target.value} : null)}
              />
              <Select 
                value={selectedWidget.category} 
                onValueChange={(value) => setSelectedWidget(prev => prev ? {...prev, category: value as WidgetCategory} : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(WidgetCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditWidget}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Widget</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this widget? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteWidget}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
