import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  PageConfiguration, 
  PageStatus, 
  createNewPage 
} from '../types/page';

interface PageBuilderStore {
  pages: PageConfiguration[];
  currentPage: PageConfiguration | null;
  
  // Page Management Actions
  addPage: (page?: Partial<PageConfiguration>) => void;
  updatePage: (pageId: string, updates: Partial<PageConfiguration>) => void;
  deletePage: (pageId: string) => void;
  
  // Current Page Actions
  setCurrentPage: (page: PageConfiguration | null) => void;
  
  // Utility Methods
  getPageById: (pageId: string) => PageConfiguration | undefined;
}

export const usePageBuilderStore = create<PageBuilderStore>()(
  persist(
    (set, get) => ({
      pages: [],
      currentPage: null,
      
      addPage: (partialPage = {}) => {
        const newPage = createNewPage(partialPage.metadata?.author || 'Unknown');
        const mergedPage = { ...newPage, ...partialPage };
        
        set((state) => ({
          pages: [...state.pages, mergedPage],
          currentPage: mergedPage
        }));
      },
      
      updatePage: (pageId, updates) => {
        set((state) => ({
          pages: state.pages.map(page => 
            page.id === pageId 
              ? { 
                  ...page, 
                  ...updates, 
                  metadata: {
                    ...page.metadata,
                    updatedAt: new Date()
                  }
                } 
              : page
          ),
          currentPage: state.currentPage?.id === pageId 
            ? { ...state.currentPage, ...updates } 
            : state.currentPage
        }));
      },
      
      deletePage: (pageId) => {
        set((state) => {
          const updatedPages = state.pages.filter(page => page.id !== pageId);
          return {
            pages: updatedPages,
            currentPage: state.currentPage?.id === pageId ? null : state.currentPage
          };
        });
      },
      
      setCurrentPage: (page) => {
        set({ currentPage: page });
      },
      
      getPageById: (pageId) => {
        return get().pages.find(page => page.id === pageId);
      }
    }),
    {
      name: 'page-builder-storage',
      partialize: (state) => ({
        pages: state.pages,
        currentPage: state.currentPage
      })
    }
  )
);
