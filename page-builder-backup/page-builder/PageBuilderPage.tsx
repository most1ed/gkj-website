import React, { useEffect, Suspense, lazy } from 'react';
import { Editor, EditorProvider } from './components/editor/Editor';
import { PageBuilderErrorBoundary } from './components/PageBuilderErrorBoundary';
import { usePageBuilderStore } from './stores/pageBuilderStore';
import { logErrorToService } from './services/errorLoggingService';
import { Loader2 } from 'lucide-react';

// Lazy load components to reduce initial bundle size
const ComponentPanel = lazy(() => import('./components/editor/ComponentPanel'));
const Toolbar = lazy(() => import('./components/editor/Toolbar'));
const SettingsPanel = lazy(() => import('./components/editor/SettingsPanel'));

const PageBuilderContent: React.FC = () => {
  const { currentPage, editorState, initializePageBuilder } = usePageBuilderStore();

  useEffect(() => {
    try {
      initializePageBuilder();
    } catch (error) {
      logErrorToService({
        error: error instanceof Error ? error : new Error(String(error)),
        context: 'PageBuilder Initialization',
        severity: 'high'
      });
    }
  }, []);

  if (!currentPage) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-2">Memuat halaman...</p>
      </div>
    );
  }

  return (
    <EditorProvider>
      <div className="flex h-screen">
        <div className="w-64 border-r bg-white p-4 overflow-y-auto">
          <Suspense fallback={<Loader2 className="h-6 w-6 animate-spin" />}>
            <ComponentPanel />
          </Suspense>
        </div>
        
        <div className="flex-1 flex flex-col">
          <Suspense fallback={<Loader2 className="h-6 w-6 animate-spin" />}>
            <Toolbar />
          </Suspense>
          
          <div className="flex-1 overflow-auto">
            <Editor />
          </div>
          
          {!editorState.isPreviewMode && (
            <Suspense fallback={<Loader2 className="h-6 w-6 animate-spin" />}>
              <SettingsPanel />
            </Suspense>
          )}
        </div>
      </div>
    </EditorProvider>
  );
};

const PageBuilderPage: React.FC = () => {
  return (
    <PageBuilderErrorBoundary fallbackMessage="Page Builder encountered a critical error">
      <Suspense 
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="ml-2">Loading Page Builder...</p>
          </div>
        }
      >
        <PageBuilderContent />
      </Suspense>
    </PageBuilderErrorBoundary>
  );
};

export default PageBuilderPage;
