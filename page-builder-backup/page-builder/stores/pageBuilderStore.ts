import { create } from 'zustand';
import { Node } from '@craftjs/core';
import { PageData, EditorState, ComponentMeta, PageBuilderStore } from '../types/editor';

const DEFAULT_EDITOR_STATE: EditorState = {
  selectedNodeId: null,
  zoomLevel: 1,
  isPreviewMode: false,
  history: {
    canUndo: false,
    canRedo: false
  }
};

export const usePageBuilderStore = create<PageBuilderStore>((set, get) => ({
  pages: [],
  currentPage: null,
  editorState: DEFAULT_EDITOR_STATE,
  components: [],

  // Page Actions
  createPage: async (data) => {
    const newPage: PageData = {
      id: crypto.randomUUID(),
      name: data.name || 'Untitled Page',
      content: data.content || {},
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      ...data
    };

    set((state) => ({
      pages: [...state.pages, newPage],
      currentPage: newPage
    }));
  },

  updatePage: async (id, data) => {
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === id
          ? { ...page, ...data, updatedAt: new Date() }
          : page
      ),
      currentPage:
        state.currentPage?.id === id
          ? { ...state.currentPage, ...data, updatedAt: new Date() }
          : state.currentPage
    }));
  },

  deletePage: async (id) => {
    set((state) => ({
      pages: state.pages.filter((page) => page.id !== id),
      currentPage: state.currentPage?.id === id ? null : state.currentPage
    }));
  },

  publishPage: async (id) => {
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === id
          ? {
              ...page,
              status: 'published',
              publishedAt: new Date(),
              updatedAt: new Date()
            }
          : page
      )
    }));
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  // Editor Actions
  setSelectedNode: (nodeId) => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        selectedNodeId: nodeId
      }
    }));
  },

  setZoomLevel: (level) => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        zoomLevel: level
      }
    }));
  },

  setPreviewMode: (isPreview) => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        isPreviewMode: isPreview
      }
    }));
  },

  // Component Actions
  registerComponent: (component) => {
    set((state) => ({
      components: [...state.components, component]
    }));
  },

  unregisterComponent: (componentId) => {
    set((state) => ({
      components: state.components.filter((c) => c.id !== componentId)
    }));
  },

  // Tambahkan fungsi untuk membuat halaman default jika tidak ada
  initializePageBuilder: async () => {
    const state = get();
    if (state.pages.length === 0) {
      const defaultPage: PageData = {
        id: crypto.randomUUID(),
        name: 'First Page',
        content: JSON.stringify({
          ROOT: {
            type: 'div',
            props: {
              style: { 
                width: '100%', 
                height: '100%', 
                background: 'white' 
              }
            },
            nodes: [] // Explicitly empty nodes array
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft'
      };

      console.log('Initializing page builder with MINIMAL default page');
      console.log('Default Page Content:', defaultPage.content);

      set((state) => ({
        pages: [defaultPage],
        currentPage: defaultPage
      }));
    } else if (!state.currentPage) {
      console.log('Setting current page to first page in list');
      set((state) => ({
        currentPage: state.pages[0]
      }));
    }

    console.log('Final Pages:', get().pages);
    console.log('Final Current Page:', get().currentPage);
  },
}));
