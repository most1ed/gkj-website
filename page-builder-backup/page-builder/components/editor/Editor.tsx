import React, { createContext, useContext, useMemo, ReactNode, useState, useEffect } from 'react';
import { Editor as CraftEditor, Frame, Element, useEditor } from '@craftjs/core';
import { usePageBuilderStore } from '../../stores/pageBuilderStore';
import { logErrorToService } from '../../services/errorLoggingService';
import { cn } from '@/lib/utils';

// Import all custom components
import { Container } from '../user/Container';
import { Text } from '../user/Text';
import { Button } from '../user/Button';
import { Image } from '../user/Image';
import { Grid } from '../user/Grid';
import { FormInput } from '../user/FormInput';
import { FormSelect } from '../user/FormSelect';
import { FormCheckbox } from '../user/FormCheckbox';
import { FormTextarea } from '../user/FormTextarea';
import { Video } from '../user/Video';
import { Audio } from '../user/Audio';
import { Icon } from '../user/Icon';
import { SocialShare } from '../user/SocialShare';
import { SocialFollow } from '../user/SocialFollow';
import { NavigationMenu } from '../user/NavigationMenu';
import { Breadcrumb } from '../user/Breadcrumb';
import { Tabs } from '../user/Tabs';
import { Accordion } from '../user/Accordion';

// Define the shape of the editor context
interface EditorContextType {
  canUndo: boolean;
  canRedo: boolean;
  serialize: () => any;
  reset: () => void;
}

// Create the context with a default value
const EditorContext = createContext<EditorContextType>({
  canUndo: false,
  canRedo: false,
  serialize: () => ({}),
  reset: () => {}
});

// Minimal resolver with no functional components
const componentResolver = {
  div: {
    component: ({ children, style }: { children?: React.ReactNode, style?: React.CSSProperties }) => (
      <div style={style} className="w-full h-full bg-gray-100">
        Component Disabled
        {children}
      </div>
    ),
    craft: {
      props: {},
      rules: {
        canDrag: false,
        canDrop: false
      }
    }
  }
};

// Custom hook to use the editor context
export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an Editor component');
  }
  return context;
};

// Provider component
export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentPage } = usePageBuilderStore();

  return (
    <CraftEditor 
      resolver={componentResolver}
      enabled={true}
    >
      <EditorContent>{children}</EditorContent>
    </CraftEditor>
  );
};

// Wrapper for editor content to provide context
const EditorContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const editorState = useEditor((state) => {
    try {
      return {
        canUndo: state?.query?.history?.canUndo() || false,
        canRedo: state?.query?.history?.canRedo() || false,
      };
    } catch (error) {
      logErrorToService({
        error: error instanceof Error ? error : new Error(String(error)),
        context: 'Editor State Retrieval',
        severity: 'medium'
      });
      return {
        canUndo: false,
        canRedo: false,
      };
    }
  });

  const contextValue = useMemo(() => ({
    canUndo: editorState.canUndo,
    canRedo: editorState.canRedo,
    serialize: () => {
      try {
        const editor = useEditor.current;
        return editor ? editor.serialize() : {};
      } catch (error) {
        logErrorToService({
          error: error instanceof Error ? error : new Error(String(error)),
          context: 'Editor Serialization',
          severity: 'medium'
        });
        return {};
      }
    },
    reset: () => {
      try {
        const editor = useEditor.current;
        if (editor) {
          editor.reset();
        }
      } catch (error) {
        logErrorToService({
          error: error instanceof Error ? error : new Error(String(error)),
          context: 'Editor Reset',
          severity: 'medium'
        });
      }
    }
  }), [editorState.canUndo, editorState.canRedo]);

  return (
    <EditorContext.Provider value={contextValue}>
      <Frame>
        <Element is="div" canvas>
          {children}
        </Element>
      </Frame>
    </EditorContext.Provider>
  );
};

// Main Editor component
export const Editor: React.FC = () => {
  const { currentPage } = usePageBuilderStore();
  const [parsedContent, setParsedContent] = useState<any>(null);

  useEffect(() => {
    if (currentPage?.content) {
      try {
        // Try parsing the content as JSON
        const content = JSON.parse(currentPage.content);
        console.log('Parsed Content:', JSON.stringify(content, null, 2)); // Detailed debug log
        console.log('Current Page:', currentPage); // Log entire current page
        setParsedContent(content);
      } catch (error) {
        console.error('Error parsing page content:', error);
        logErrorToService({
          error: error instanceof Error ? error : new Error(String(error)),
          context: 'Page Content Parsing',
          severity: 'high'
        });
        setParsedContent(null);
      }
    } else {
      console.warn('No content found in current page');
    }
  }, [currentPage]);

  const renderComponent = (node: any, key: string) => {
    if (!node) {
      console.warn(`Attempted to render undefined node with key: ${key}`);
      return null;
    }

    const { type, props = {}, nodes = [] } = node;
    
    console.group(`Rendering Component: ${type}`);
    console.log('Node Details:', JSON.stringify(node, null, 2));
    console.log('Available Resolvers:', Object.keys(componentResolver));

    // Fallback to div if no specific component is found
    const componentDef = componentResolver[type] || componentResolver['div'];
    const Component = componentDef?.component || componentDef;

    if (!Component) {
      console.error(`CRITICAL: No component found for type: ${type}`);
      logErrorToService({
        error: new Error(`Undefined component type: ${type}`),
        context: 'Component Rendering',
        severity: 'high',
        additionalInfo: { nodeType: type, nodeProps: props }
      });
      
      console.groupEnd();
      return (
        <div 
          key={key} 
          className="bg-red-100 p-2 m-2 border border-red-500"
        >
          Error: Undefined Component Type {type}
        </div>
      );
    }

    console.groupEnd();
    return (
      <Component key={key} {...props}>
        {nodes && nodes.map((childNode: any, index: number) => 
          renderComponent(childNode, `${key}-${index}`)
        )}
      </Component>
    );
  };

  if (!currentPage) {
    return null;
  }

  return (
    <div className="w-full h-full p-4">
      <EditorProvider>
        {parsedContent && (
          <div>
            {Object.entries(parsedContent).map(([key, value]) => {
              console.log(`Processing key: ${key}`, value); // Debug log
              // Render components based on the parsed content
              if (key === 'ROOT') {
                return renderComponent(value, key);
              }
              return null;
            })}
          </div>
        )}
      </EditorProvider>
    </div>
  );
};

const EditorWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const editor = useEditor((state) => ({
    selectedNodeId: state.events.selected,
    canUndo: state.query.history.canUndo(),
    canRedo: state.query.history.canRedo(),
  }));

  return (
    <EditorContext.Provider value={editor}>
      {children}
    </EditorContext.Provider>
  );
};

const RenderNode = ({ render }: any) => {
  const editor = useEditor();

  const currentNodeId = editor?.query?.getEvent?.('selected')?.[0];
  const isSelected = currentNodeId === render?.id;

  if (!render || !render.render) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative',
        isSelected && 'outline outline-2 outline-blue-500'
      )}
    >
      {render.render}
      {isSelected && (
        <div className="absolute -top-4 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-t">
          {render.type || 'Component'}
        </div>
      )}
    </div>
  );
};
