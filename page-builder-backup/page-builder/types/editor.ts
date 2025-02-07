import { Node } from '@craftjs/core';

export interface PageData {
  id: string;
  name: string;
  description?: string;
  content: Node;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface ComponentMeta {
  id: string;
  name: string;
  type: string;
  category: 'layout' | 'content' | 'form' | 'media' | 'custom';
  icon?: string;
  defaultProps?: Record<string, any>;
}

export interface EditorState {
  selectedNodeId: string | null;
  zoomLevel: number;
  isPreviewMode: boolean;
  history: {
    canUndo: boolean;
    canRedo: boolean;
  };
}

export interface PageBuilderStore {
  pages: PageData[];
  currentPage: PageData | null;
  editorState: EditorState;
  components: ComponentMeta[];
  
  // Actions
  createPage: (data: Partial<PageData>) => Promise<void>;
  updatePage: (id: string, data: Partial<PageData>) => Promise<void>;
  deletePage: (id: string) => Promise<void>;
  publishPage: (id: string) => Promise<void>;
  setCurrentPage: (page: PageData | null) => void;
  
  // Editor Actions
  setSelectedNode: (nodeId: string | null) => void;
  setZoomLevel: (level: number) => void;
  setPreviewMode: (isPreview: boolean) => void;
  
  // Component Actions
  registerComponent: (component: ComponentMeta) => void;
  unregisterComponent: (componentId: string) => void;
}
