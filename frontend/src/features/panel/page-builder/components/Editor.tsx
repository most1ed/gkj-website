import React, { useState, useCallback } from 'react';
import { usePageBuilderStore } from '../stores/pageBuilderStore';
import { ComponentRenderer } from './ComponentRenderer';
import { ComponentMeta, ComponentType } from '../types/editor';
import { logErrorToService } from '../services/errorLoggingService';
import { 
  PlusCircle, 
  Move, 
  Trash2, 
  Eye, 
  EyeOff, 
  Layers, 
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  RotateCcw,
  Save
} from 'lucide-react';

export const Editor: React.FC = () => {
  const { 
    currentPage, 
    pages,
    addComponent, 
    updateComponent,
    deleteComponent,
    moveComponent,
    config,
    editorState,
    togglePreviewMode,
    setActivePanel,
    setSelectedComponent,
    createPage,
    deletePage,
    duplicatePage,
    savePageVersion,
    pageVersions
  } = usePageBuilderStore();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [newComponentType, setNewComponentType] = useState<ComponentType>('text');
  const [showPageVersions, setShowPageVersions] = useState(false);

  const handleAddComponent = useCallback(() => {
    if (!currentPage) return;

    try {
      const newComponent: ComponentMeta = {
        id: crypto.randomUUID(),
        type: newComponentType,
        props: {
          style: {
            padding: '10px',
            margin: '5px',
            backgroundColor: newComponentType === 'container' ? '#f0f0f0' : undefined
          },
          content: newComponentType === 'text' 
            ? 'New Text Component' 
            : newComponentType === 'button' 
              ? 'Click me' 
              : undefined
        },
        metadata: {
          label: `New ${newComponentType} Component`
        }
      };

      const parentId = editorState.selectedComponentId || currentPage.content.id;
      addComponent(parentId, newComponent);
      
      setSelectedComponent(newComponent.id);
    } catch (error) {
      logErrorToService({
        error: error instanceof Error ? error : new Error('Failed to add component'),
        context: 'Add Component',
        severity: 'high'
      });
    }
  }, [
    currentPage, 
    newComponentType, 
    editorState.selectedComponentId, 
    addComponent, 
    setSelectedComponent
  ]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleCreateNewPage = () => {
    createPage();
  };

  const handleDeleteCurrentPage = () => {
    if (currentPage) {
      deletePage(currentPage.id);
    }
  };

  const handleDuplicateCurrentPage = () => {
    if (currentPage) {
      duplicatePage(currentPage.id);
    }
  };

  const handleSavePageVersion = () => {
    if (currentPage) {
      savePageVersion(currentPage.id);
    }
  };

  const handleDragStart = (componentId: string) => {
    setDraggedComponent(componentId);
  };

  const handleDragEnd = () => {
    setDraggedComponent(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetComponentId: string) => {
    if (draggedComponent && draggedComponent !== targetComponentId) {
      moveComponent(draggedComponent, targetComponentId);
      setDraggedComponent(null);
    }
  };

  return (
    <div className="flex h-full">
      {/* Collapsible Sidebar */}
      <div 
        className={`
          ${isSidebarCollapsed ? 'w-16' : 'w-1/4'} 
          bg-gray-100 border-r transition-all duration-300 relative
        `}
      >
        <button 
          onClick={toggleSidebar}
          className="absolute top-4 right-4 z-10 text-gray-600 hover:text-blue-500"
        >
          {isSidebarCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </button>

        {!isSidebarCollapsed ? (
          <div className="p-4 space-y-4">
            {/* Page Management Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Pages</h3>
              <div className="flex space-x-2 mb-2">
                <button 
                  onClick={handleCreateNewPage}
                  className="bg-blue-500 text-white p-2 rounded flex items-center"
                  title="Create New Page"
                >
                  <PlusCircle className="mr-2" size={16} /> New
                </button>
                {currentPage && (
                  <>
                    <button 
                      onClick={handleDuplicateCurrentPage}
                      className="bg-green-500 text-white p-2 rounded flex items-center"
                      title="Duplicate Current Page"
                    >
                      <Copy className="mr-2" size={16} /> Duplicate
                    </button>
                    <button 
                      onClick={handleDeleteCurrentPage}
                      className="bg-red-500 text-white p-2 rounded flex items-center"
                      title="Delete Current Page"
                    >
                      <Trash2 className="mr-2" size={16} /> Delete
                    </button>
                  </>
                )}
              </div>

              {/* Page List */}
              <div className="space-y-1">
                {pages.map(page => (
                  <div 
                    key={page.id}
                    className={`
                      p-2 rounded cursor-pointer 
                      ${currentPage?.id === page.id ? 'bg-blue-100' : 'hover:bg-gray-200'}
                    `}
                    onClick={() => {
                      // TODO: Implement page selection
                    }}
                  >
                    {page.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Page Version Control */}
            {currentPage && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Versions</h3>
                  <button 
                    onClick={handleSavePageVersion}
                    className="text-blue-500 hover:text-blue-700"
                    title="Save Current Version"
                  >
                    <Save size={16} />
                  </button>
                </div>
                
                {pageVersions[currentPage.id]?.slice(0, 5).map((version, index) => (
                  <div 
                    key={version.id} 
                    className="bg-white p-2 rounded mb-1 flex justify-between items-center"
                  >
                    <span className="text-sm">
                      Version {index + 1} 
                      {version.author && ` - ${version.author}`}
                    </span>
                    <button 
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                      onClick={() => {
                        // TODO: Implement version restoration
                      }}
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Page Builder</h2>
              <button 
                onClick={() => togglePreviewMode()}
                className="text-gray-600 hover:text-blue-500"
                title={editorState.isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
              >
                {editorState.isPreviewMode ? <Eye /> : <EyeOff />}
              </button>
            </div>

            {/* Component Type Selection */}
            <div>
              <label className="block mb-2 font-semibold">Add Component</label>
              <div className="grid grid-cols-3 gap-2">
                {config.allowedComponentTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setNewComponentType(type);
                      handleAddComponent();
                    }}
                    className={`
                      p-2 rounded text-center text-xs
                      ${newComponentType === type ? 'bg-blue-500 text-white' : 'bg-white'}
                      hover:bg-blue-100 transition-colors
                    `}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Panels */}
            <div className="flex space-x-2 justify-between">
              {[
                { panel: 'components', icon: <Layers /> },
                { panel: 'styles', icon: <Settings /> }
              ].map(({ panel, icon }) => (
                <button
                  key={panel}
                  onClick={() => setActivePanel(panel as any)}
                  className={`
                    p-2 rounded-full 
                    ${editorState.activePanel === panel ? 'bg-blue-500 text-white' : 'bg-white'}
                    hover:bg-blue-100 transition-colors
                  `}
                  title={`${panel.charAt(0).toUpperCase() + panel.slice(1)} Panel`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center pt-4 space-y-4">
            <button 
              onClick={() => togglePreviewMode()}
              className="text-gray-600 hover:text-blue-500"
              title={editorState.isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
            >
              {editorState.isPreviewMode ? <Eye /> : <EyeOff />}
            </button>
            
            {config.allowedComponentTypes.map(type => (
              <button
                key={type}
                onClick={() => {
                  setNewComponentType(type);
                  handleAddComponent();
                }}
                className="text-gray-600 hover:text-blue-500"
                title={`Add ${type} Component`}
              >
                <PlusCircle />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Canvas Area */}
      <div 
        className={`
          ${isSidebarCollapsed ? 'w-[calc(100%-4rem)]' : 'w-3/4'} 
          p-4 overflow-auto transition-all duration-300
        `}
        onDragOver={handleDragOver}
      >
        <div 
          className={`
            border p-4 min-h-[500px] 
            ${editorState.isPreviewMode ? 'pointer-events-none' : ''}
          `}
        >
          {currentPage ? (
            <ComponentRenderer 
              component={currentPage.content} 
              isEditing={!editorState.isPreviewMode}
              onContentChange={() => {
                // Optional: Add any specific handling for content changes
              }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
            />
          ) : (
            <div className="text-center text-gray-500 p-4">
              No page selected. Create a new page to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
