import React from 'react';
import { 
  Undo, 
  Redo, 
  Eye, 
  EyeOff, 
  Save, 
  Layers, 
  Trash2 
} from 'lucide-react';
import { usePageBuilderStore } from '../../stores/pageBuilderStore';
import { useEditorContext } from './Editor';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PagePreview } from '../PagePreview';
import { PageExportImport } from '../PageExportImport';
import { PageVersionHistory } from '../PageVersionHistory';
import { logErrorToService } from '../../services/errorLoggingService';
import { toast } from '@/components/ui/use-toast';

const Toolbar: React.FC = () => {
  const { currentPage, editorState } = usePageBuilderStore();
  
  // Safely get editor context with fallback
  const editorContext = (() => {
    try {
      return useEditorContext();
    } catch (error) {
      logErrorToService({
        error: error instanceof Error ? error : new Error(String(error)),
        context: 'Toolbar Editor Context',
        severity: 'medium'
      });
      
      toast({
        title: "Editor Context Error",
        description: "Could not access editor functionality",
        variant: "destructive"
      });

      // Return a safe fallback object
      return {
        canUndo: false,
        canRedo: false,
        serialize: () => ({}),
        reset: () => {}
      };
    }
  })();

  const togglePreviewMode = () => {
    try {
      usePageBuilderStore.getState().setPreviewMode(!editorState.isPreviewMode);
    } catch (error) {
      logErrorToService({
        error: error instanceof Error ? error : new Error(String(error)),
        context: 'Toggle Preview Mode',
        severity: 'low'
      });
    }
  };

  const handleUndo = () => {
    try {
      if (editorContext.canUndo) {
        editorContext.reset();
      }
    } catch (error) {
      logErrorToService({
        error: error instanceof Error ? error : new Error(String(error)),
        context: 'Undo Action',
        severity: 'medium'
      });
    }
  };

  const handleRedo = () => {
    try {
      if (editorContext.canRedo) {
        // Potential redo logic
      }
    } catch (error) {
      logErrorToService({
        error: error instanceof Error ? error : new Error(String(error)),
        context: 'Redo Action',
        severity: 'medium'
      });
    }
  };

  const handleSave = () => {
    try {
      if (currentPage) {
        const serializedContent = editorContext.serialize();
        usePageBuilderStore.getState().updatePage(currentPage.id, {
          status: 'draft',
          content: JSON.stringify(serializedContent),
          updatedAt: new Date()
        });

        toast({
          title: "Page Saved",
          description: "Your changes have been saved",
          variant: "default"
        });
      }
    } catch (error) {
      logErrorToService({
        error: error instanceof Error ? error : new Error(String(error)),
        context: 'Save Page',
        severity: 'high'
      });

      toast({
        title: "Save Failed",
        description: "Could not save page changes",
        variant: "destructive"
      });
    }
  };

  const handleDelete = () => {
    try {
      if (currentPage) {
        usePageBuilderStore.getState().deletePage(currentPage.id);

        toast({
          title: "Page Deleted",
          description: "The current page has been removed",
          variant: "default"
        });
      }
    } catch (error) {
      logErrorToService({
        error: error instanceof Error ? error : new Error(String(error)),
        context: 'Delete Page',
        severity: 'high'
      });

      toast({
        title: "Delete Failed",
        description: "Could not delete the page",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-2 bg-white border-b">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                disabled={!editorContext.canUndo}
                onClick={handleUndo}
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                disabled={!editorContext.canRedo}
                onClick={handleRedo}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={togglePreviewMode}
              >
                {editorState.isPreviewMode ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {editorState.isPreviewMode ? 'Exit Preview' : 'Preview'}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSave}
              >
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
              >
                <Layers className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Layers</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center space-x-2">
        <PagePreview />
        <PageExportImport />
        <PageVersionHistory />
      </div>
    </div>
  );
};

export default Toolbar;
