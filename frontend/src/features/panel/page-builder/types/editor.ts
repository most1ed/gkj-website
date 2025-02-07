export type ComponentType = 
  | 'container' 
  | 'text' 
  | 'button' 
  | 'image' 
  | 'section'
  | 'heading'
  | 'input'
  | 'form'
  | 'column'
  | 'row';

export interface BoxShadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

export interface BorderStyle {
  width: number;
  style: 'solid' | 'dashed' | 'dotted';
  color: string;
  radius?: number;
}

export interface StyleProps {
  // Layout
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  display?: 'block' | 'inline' | 'flex' | 'grid';
  flexDirection?: 'row' | 'column';
  justifyContent?: 'start' | 'end' | 'center' | 'space-between';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  gap?: string;

  // Spacing
  margin?: string;
  padding?: string;

  // Background
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: 'cover' | 'contain' | 'auto';
  backgroundPosition?: string;

  // Typography
  color?: string;
  fontSize?: string;
  fontWeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: string;
  letterSpacing?: string;

  // Border
  border?: BorderStyle;
  boxShadow?: BoxShadow;

  // Positioning
  position?: 'static' | 'relative' | 'absolute' | 'fixed';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;

  // Interactivity
  cursor?: 'default' | 'pointer' | 'text';
  opacity?: number;
  transition?: string;
}

export interface ComponentInteractions {
  onClick?: string; // Serialized function or action
  onHover?: {
    style?: Partial<StyleProps>;
    action?: string;
  };
  onFocus?: {
    style?: Partial<StyleProps>;
    action?: string;
  };
}

export interface ComponentValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customValidation?: string; // Serialized validation function
}

export interface ComponentMeta {
  id: string;
  type: ComponentType;
  props: {
    style?: StyleProps;
    content?: string;
    interactions?: ComponentInteractions;
    validation?: ComponentValidation;
    [key: string]: any;
  };
  children?: ComponentMeta[];
  metadata?: {
    label?: string;
    description?: string;
    category?: string;
  };
}

export interface PageData {
  id: string;
  name: string;
  content: ComponentMeta;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  version?: number;
  metadata?: {
    author?: string;
    tags?: string[];
    permissions?: string[];
  };
}

export interface EditorState {
  isPreviewMode: boolean;
  zoomLevel: number;
  selectedComponentId?: string;
  activePanel: 'components' | 'styles' | 'interactions' | 'validation';
}

export interface PageBuilderConfig {
  maxComponents: number;
  allowedComponentTypes: ComponentType[];
  globalStyles?: StyleProps;
  permissions?: {
    canEdit: boolean;
    canPublish: boolean;
  };
}
