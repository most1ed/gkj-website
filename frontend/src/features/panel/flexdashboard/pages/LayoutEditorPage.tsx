import React, { useState } from 'react';
import { 
  Responsive, 
  WidthProvider 
} from 'react-grid-layout';
import { 
  Save, 
  Undo, 
  Redo, 
  Grid, 
  Columns, 
  Rows 
} from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { useLayoutPersistence } from '../hooks/useLayoutPersistence';
import { DashboardLayout, LayoutItem } from '../types/dashboard.types';

const ResponsiveGridLayout = WidthProvider(Responsive);

const LayoutEditorPage: React.FC = () => {
  const { layout, updateLayout } = useDashboardStore();
  const { resetLayout } = useLayoutPersistence(layout);

  const [editMode, setEditMode] = useState<'grid' | 'columns' | 'rows'>('grid');

  const handleLayoutChange = (currentLayout: LayoutItem[]) => {
    updateLayout({
      lg: currentLayout,
      md: currentLayout,
      sm: currentLayout
    });
  };

  const renderLayoutControls = () => (
    <div className="flex items-center space-x-4 mb-4">
      <button 
        onClick={() => setEditMode('grid')}
        className={`p-2 rounded ${editMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        <Grid size={20} />
      </button>
      <button 
        onClick={() => setEditMode('columns')}
        className={`p-2 rounded ${editMode === 'columns' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        <Columns size={20} />
      </button>
      <button 
        onClick={() => setEditMode('rows')}
        className={`p-2 rounded ${editMode === 'rows' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        <Rows size={20} />
      </button>
    </div>
  );

  const renderActionButtons = () => (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => updateLayout(layout)}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        <Save size={20} className="mr-2" /> Save Layout
      </button>
      <button 
        onClick={resetLayout}
        className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
      >
        <Undo size={20} className="mr-2" /> Reset to Default
      </button>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Layout Editor</h1>

        <div className="mb-6">
          {renderLayoutControls()}
          {renderActionButtons()}
        </div>

        <ResponsiveGridLayout
          className="layout"
          layouts={layout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
          rowHeight={100}
          onLayoutChange={handleLayoutChange}
          isDraggable
          isResizable
        >
          {layout.lg.map(item => (
            <div 
              key={item.i} 
              className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
            >
              Widget {item.i}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default LayoutEditorPage;
