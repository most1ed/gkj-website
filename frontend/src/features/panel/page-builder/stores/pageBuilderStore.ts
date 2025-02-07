import { create } from 'zustand';
import { 
  PageData, 
  EditorState, 
  ComponentMeta, 
  ComponentType,
  PageBuilderConfig,
  StyleProps,
  ComponentInteractions,
  ComponentValidation
} from '../types/editor';
import { logErrorToService } from '../services/errorLoggingService';

interface PageBuilderStore {
  pages: PageData[];
  currentPage: PageData | null;
  editorState: EditorState;
  config: PageBuilderConfig;

  // Page Management
  createPage: (name?: string) => void;
  setCurrentPage: (page: PageData) => void;
  updatePage: (id: string, data: Partial<PageData>) => void;
  deletePage: (id: string) => void;
  duplicatePage: (id: string) => void;

  // Component Management
  addComponent: (parentId: string, component: ComponentMeta) => void;
  updateComponent: (
    componentId: string, 
    updates: {
      props?: Partial<ComponentMeta['props']>;
      style?: Partial<StyleProps>;
      interactions?: Partial<ComponentInteractions>;
      validation?: Partial<ComponentValidation>;
      metadata?: Partial<ComponentMeta['metadata']>;
    }
  ) => void;
  deleteComponent: (componentId: string) => void;
  moveComponent: (componentId: string, newParentId: string) => void;
  duplicateComponent: (componentId: string) => void;
  resizeComponent: (
    componentId: string, 
    dimensions: { 
      width?: string | number, 
      height?: string | number 
    }
  ) => void;
  
  // Editor State Management
  setSelectedComponent: (componentId?: string) => void;
  setActivePanel: (panel: EditorState['activePanel']) => void;
  togglePreviewMode: () => void;
  setZoomLevel: (level: number) => void;

  // Advanced Page Management
  savePageVersion: (pageId: string, author?: string) => void;
  restorePageVersion: (pageId: string, versionId: string) => void;
  pageVersions: Record<string, { id: string; content: ComponentMeta; timestamp: number; author?: string }[]>;
}

// Deep clone utility to create a new component with a unique ID
const deepCloneComponent = (component: ComponentMeta): ComponentMeta => {
  const clonedComponent = JSON.parse(JSON.stringify(component));
  clonedComponent.id = crypto.randomUUID();
  
  // Recursively clone children if they exist
  if (clonedComponent.children) {
    clonedComponent.children = clonedComponent.children.map(deepCloneComponent);
  }
  
  return clonedComponent;
};

const generateUniquePageName = (pages: PageData[], baseName = 'Untitled Page') => {
  const existingNames = new Set(pages.map(page => page.name));
  let counter = 1;
  let newName = baseName;

  while (existingNames.has(newName)) {
    newName = `${baseName} ${counter}`;
    counter++;
  }

  return newName;
};

export const usePageBuilderStore = create<PageBuilderStore>((set, get) => ({
  pages: [],
  currentPage: null,
  editorState: {
    isPreviewMode: false,
    zoomLevel: 100,
    activePanel: 'components'
  },
  config: {
    maxComponents: 100,
    allowedComponentTypes: [
      'container', 'text', 'button', 'image', 'section', 
      'heading', 'input', 'form', 'column', 'row'
    ],
    globalStyles: {
      fontFamily: 'Inter, sans-serif',
      color: '#333333'
    },
    permissions: {
      canEdit: true,
      canPublish: true
    }
  },
  pageVersions: {},

  createPage: (name = 'Untitled Page') => {
    const rootComponent: ComponentMeta = {
      id: crypto.randomUUID(),
      type: 'container',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff'
        }
      },
      metadata: {
        label: 'Root Container',
        category: 'layout'
      },
      children: []
    };

    const newPage: PageData = {
      id: crypto.randomUUID(),
      name,
      content: rootComponent,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      version: 1,
      metadata: {
        author: 'Current User', // TODO: Replace with actual user
        tags: ['new', 'draft']
      }
    };

    set((state) => ({
      pages: [...state.pages, newPage],
      currentPage: newPage,
      pageVersions: {
        ...state.pageVersions,
        [newPage.id]: [{
          id: crypto.randomUUID(),
          content: rootComponent,
          timestamp: Date.now()
        }]
      }
    }));

    return newPage;
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  updatePage: (id, data) => {
    set((state) => {
      const updatedPages = state.pages.map(page => 
        page.id === id 
          ? { 
              ...page, 
              ...data, 
              updatedAt: new Date(),
              version: (page.version || 0) + 1 
            } 
          : page
      );

      return {
        pages: updatedPages,
        currentPage: state.currentPage?.id === id 
          ? { 
              ...state.currentPage, 
              ...data, 
              updatedAt: new Date(),
              version: (state.currentPage.version || 0) + 1 
            } 
          : state.currentPage
      };
    });
  },

  deletePage: (id) => {
    set((state) => {
      const remainingPages = state.pages.filter(page => page.id !== id);
      return {
        pages: remainingPages,
        currentPage: remainingPages.length > 0 ? remainingPages[0] : null,
        pageVersions: Object.fromEntries(Object.entries(state.pageVersions).filter(([key]) => key !== id))
      };
    });
  },

  duplicatePage: (id) => {
    set((state) => {
      const pageToDuplicate = state.pages.find(page => page.id === id);
      
      if (!pageToDuplicate) return state;

      const duplicatedPage: PageData = {
        ...pageToDuplicate,
        id: crypto.randomUUID(),
        name: `${pageToDuplicate.name} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        status: 'draft'
      };

      // Deep clone the content to ensure unique IDs
      duplicatedPage.content = JSON.parse(JSON.stringify(pageToDuplicate.content));
      
      // Recursively update component IDs
      const updateComponentIds = (component: ComponentMeta): ComponentMeta => {
        component.id = crypto.randomUUID();
        if (component.children) {
          component.children = component.children.map(updateComponentIds);
        }
        return component;
      };

      duplicatedPage.content = updateComponentIds(duplicatedPage.content);

      return {
        pages: [...state.pages, duplicatedPage],
        currentPage: duplicatedPage,
        pageVersions: {
          ...state.pageVersions,
          [duplicatedPage.id]: [{
            id: crypto.randomUUID(),
            content: duplicatedPage.content,
            timestamp: Date.now()
          }]
        }
      };
    });
  },

  addComponent: (parentId, component) => {
    set((state) => {
      if (!state.currentPage) {
        logErrorToService({
          error: new Error('No current page to add component'),
          context: 'Add Component',
          severity: 'high'
        });
        return state;
      }

      const findAndAddComponent = (components: ComponentMeta[]): ComponentMeta[] => 
        components.map(comp => {
          if (comp.id === parentId) {
            // Validate component type
            if (!get().config.allowedComponentTypes.includes(component.type)) {
              logErrorToService({
                error: new Error(`Component type not allowed: ${component.type}`),
                context: 'Add Component',
                severity: 'medium'
              });
              return comp;
            }

            // Check max components limit
            if ((comp.children?.length || 0) >= get().config.maxComponents) {
              logErrorToService({
                error: new Error('Maximum components limit reached'),
                context: 'Add Component',
                severity: 'medium'
              });
              return comp;
            }

            return {
              ...comp,
              children: [...(comp.children || []), component]
            };
          }
          
          return comp.children 
            ? { ...comp, children: findAndAddComponent(comp.children) }
            : comp;
        });

      return {
        currentPage: {
          ...state.currentPage,
          content: {
            ...state.currentPage.content,
            children: findAndAddComponent([state.currentPage.content])
          },
          updatedAt: new Date()
        }
      };
    });
  },

  updateComponent: (componentId, updates) => {
    set((state) => {
      if (!state.currentPage) return state;

      const updateComponents = (components: ComponentMeta[]): ComponentMeta[] => 
        components.map(comp => {
          if (comp.id === componentId) {
            return { 
              ...comp, 
              props: {
                ...comp.props,
                ...updates.props,
                style: {
                  ...comp.props.style,
                  ...updates.style
                }
              },
              metadata: {
                ...comp.metadata,
                ...updates.metadata
              },
              interactions: updates.interactions 
                ? { ...comp.props.interactions, ...updates.interactions }
                : comp.props.interactions,
              validation: updates.validation
                ? { ...comp.props.validation, ...updates.validation }
                : comp.props.validation
            };
          }
          
          return comp.children 
            ? { ...comp, children: updateComponents(comp.children) }
            : comp;
        });

      return {
        currentPage: {
          ...state.currentPage,
          content: {
            ...state.currentPage.content,
            children: updateComponents([state.currentPage.content])
          },
          updatedAt: new Date()
        }
      };
    });
  },

  deleteComponent: (componentId) => {
    set((state) => {
      if (!state.currentPage) return state;

      const deleteFromComponents = (components: ComponentMeta[]): ComponentMeta[] => 
        components.reduce((acc: ComponentMeta[], comp) => {
          if (comp.id === componentId) {
            return acc; // Remove this component
          }
          
          if (comp.children) {
            return [
              ...acc, 
              { 
                ...comp, 
                children: deleteFromComponents(comp.children) 
              }
            ];
          }
          
          return [...acc, comp];
        }, []);

      return {
        currentPage: {
          ...state.currentPage,
          content: {
            ...state.currentPage.content,
            children: deleteFromComponents([state.currentPage.content])
          },
          updatedAt: new Date()
        }
      };
    });
  },

  moveComponent: (componentId, newParentId) => {
    set((state) => {
      if (!state.currentPage) return state;

      let componentToMove: ComponentMeta | null = null;

      // Find and remove component from its original parent
      const removeFromParent = (components: ComponentMeta[]): ComponentMeta[] => 
        components.reduce((acc: ComponentMeta[], comp) => {
          if (comp.children?.some(child => child.id === componentId)) {
            const filteredChildren = comp.children.filter(child => child.id !== componentId);
            componentToMove = comp.children.find(child => child.id === componentId) || null;
            
            return [
              ...acc, 
              { ...comp, children: filteredChildren }
            ];
          }
          
          if (comp.children) {
            return [
              ...acc, 
              { 
                ...comp, 
                children: removeFromParent(comp.children) 
              }
            ];
          }
          
          return [...acc, comp];
        }, []);

      // Add component to new parent
      const addToNewParent = (components: ComponentMeta[]): ComponentMeta[] => 
        components.map(comp => {
          if (comp.id === newParentId && componentToMove) {
            return {
              ...comp,
              children: [...(comp.children || []), componentToMove]
            };
          }
          
          return comp.children 
            ? { ...comp, children: addToNewParent(comp.children) }
            : comp;
        });

      const updatedContent = addToNewParent(removeFromParent([state.currentPage.content]));

      return {
        currentPage: {
          ...state.currentPage,
          content: updatedContent[0],
          updatedAt: new Date()
        }
      };
    });
  },

  duplicateComponent: (componentId) => {
    set((state) => {
      if (!state.currentPage) return;

      const findAndDuplicateComponent = (
        components: ComponentMeta[], 
        targetId: string
      ): ComponentMeta[] => {
        return components.map(component => {
          if (component.id === targetId) {
            const duplicatedComponent = deepCloneComponent(component);
            
            // Adjust position slightly to show it's a new component
            if (duplicatedComponent.props.style) {
              duplicatedComponent.props.style.left = 
                `calc(${component.props.style?.left || '0px'} + 20px)`;
              duplicatedComponent.props.style.top = 
                `calc(${component.props.style?.top || '0px'} + 20px)`;
            }

            return duplicatedComponent;
          }

          // Recursively handle nested components
          if (component.children) {
            component.children = findAndDuplicateComponent(
              component.children, 
              targetId
            );
          }

          return component;
        });
      };

      // Find the component in the page content and duplicate it
      state.currentPage.content.children = findAndDuplicateComponent(
        state.currentPage.content.children || [], 
        componentId
      );
    });
  },

  resizeComponent: (componentId, dimensions) => {
    set((state) => {
      if (!state.currentPage) return;

      const findAndResizeComponent = (
        components: ComponentMeta[], 
        targetId: string
      ): ComponentMeta[] => {
        return components.map(component => {
          if (component.id === targetId) {
            // Merge new dimensions with existing style
            component.props.style = {
              ...component.props.style,
              ...dimensions
            };
          }

          // Recursively handle nested components
          if (component.children) {
            component.children = findAndResizeComponent(
              component.children, 
              targetId
            );
          }

          return component;
        });
      };

      // Find the component in the page content and resize it
      state.currentPage.content.children = findAndResizeComponent(
        state.currentPage.content.children || [], 
        componentId
      );
    });
  },

  setSelectedComponent: (componentId) => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        selectedComponentId: componentId
      }
    }));
  },

  setActivePanel: (panel) => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        activePanel: panel
      }
    }));
  },

  togglePreviewMode: () => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        isPreviewMode: !state.editorState.isPreviewMode
      }
    }));
  },

  setZoomLevel: (level) => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        zoomLevel: Math.max(25, Math.min(200, level))
      }
    }));
  },

  savePageVersion: (pageId, author) => {
    set((state) => {
      const page = state.pages.find(p => p.id === pageId);
      if (page) {
        const newVersion = {
          id: crypto.randomUUID(),
          content: page.content,
          timestamp: Date.now(),
          author
        };

        // Ensure version history exists
        if (!state.pageVersions[pageId]) {
          state.pageVersions[pageId] = [];
        }

        // Add new version, limit to last 10 versions
        state.pageVersions[pageId].unshift(newVersion);
        if (state.pageVersions[pageId].length > 10) {
          state.pageVersions[pageId].pop();
        }
      }
    });
  },

  restorePageVersion: (pageId, versionId) => {
    set((state) => {
      const pageVersions = state.pageVersions[pageId];
      const versionToRestore = pageVersions?.find(v => v.id === versionId);

      if (versionToRestore) {
        const pageIndex = state.pages.findIndex(p => p.id === pageId);
        if (pageIndex !== -1) {
          // Restore the page content from the selected version
          state.pages[pageIndex].content = versionToRestore.content;
          
          // Update current page if it's the same page
          if (state.currentPage?.id === pageId) {
            state.currentPage.content = versionToRestore.content;
          }
        }
      }
    });
  }
}));
