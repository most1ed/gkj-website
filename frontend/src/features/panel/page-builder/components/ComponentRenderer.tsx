import React, { useState, useRef, useEffect } from 'react';
import { ComponentMeta } from '../types/editor';
import { usePageBuilderStore } from '../stores/pageBuilderStore';
import { cn } from '@/lib/utils';

interface ComponentRendererProps {
  component: ComponentMeta;
  isEditing?: boolean;
  onContentChange?: (content: string) => void;
  onDragStart?: (componentId: string) => void;
  onDragEnd?: () => void;
  onDrop?: (targetComponentId: string) => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  component, 
  isEditing = false,
  onContentChange,
  onDragStart,
  onDragEnd,
  onDrop
}) => {
  const { 
    setSelectedComponent, 
    deleteComponent,
    updateComponent,
    duplicateComponent,
    resizeComponent
  } = usePageBuilderStore();

  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(component.props.content || '');
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<'e' | 'se' | 's'>('se');
  const contentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const resizeStartRef = useRef<{ x: number, y: number, width: number, height: number }>({
    x: 0, y: 0, width: 0, height: 0
  });

  useEffect(() => {
    // Reset content when component changes
    setEditableContent(component.props.content || '');
  }, [component.props.content]);

  const handleInlineEditStart = () => {
    if (isEditing) {
      setIsInlineEditing(true);
      // Focus and select all text
      setTimeout(() => {
        const range = document.createRange();
        const selection = window.getSelection();
        if (contentRef.current && selection) {
          range.selectNodeContents(contentRef.current);
          selection.removeAllRanges();
          selection.addRange(range);
          contentRef.current.focus();
        }
      }, 0);
    }
  };

  const handleInlineEditEnd = () => {
    setIsInlineEditing(false);
    
    // Update component content if changed
    if (editableContent !== component.props.content) {
      updateComponent(component.id, {
        props: {
          content: editableContent
        }
      });
      
      onContentChange?.(editableContent);
    }
  };

  const handleResizeStart = (
    e: React.MouseEvent, 
    direction: 'e' | 'se' | 's'
  ) => {
    if (!isEditing || !componentRef.current) return;

    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);

    const rect = componentRef.current.getBoundingClientRect();
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing || !componentRef.current) return;

    const { x, y, width, height } = resizeStartRef.current;
    let newWidth = width, newHeight = height;

    if (resizeDirection === 'e' || resizeDirection === 'se') {
      newWidth = width + (e.clientX - x);
    }

    if (resizeDirection === 's' || resizeDirection === 'se') {
      newHeight = height + (e.clientY - y);
    }

    // Update component style
    resizeComponent(component.id, {
      width: `${Math.max(50, newWidth)}px`,
      height: `${Math.max(50, newHeight)}px`
    });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  const renderResizeHandles = () => {
    if (!isEditing) return null;

    return (
      <>
        {/* East (right) resize handle */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-500 cursor-e-resize z-10"
          onMouseDown={(e) => handleResizeStart(e, 'e')}
        />
        {/* Southeast (bottom-right) resize handle */}
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize z-10"
          onMouseDown={(e) => handleResizeStart(e, 'se')}
        />
        {/* South (bottom) resize handle */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-blue-500 cursor-s-resize z-10"
          onMouseDown={(e) => handleResizeStart(e, 's')}
        />
      </>
    );
  };

  const renderComponentByType = () => {
    const { type, props, children } = component;
    const baseStyle = {
      ...props.style,
      position: 'relative'
    };

    const editingClasses = isEditing 
      ? 'border-2 border-dashed hover:border-blue-500 transition-colors' 
      : '';

    const typeStyles: Record<string, string> = {
      container: 'min-h-[50px] p-2',
      text: 'p-1 min-h-[20px]',
      heading: 'text-xl font-bold p-1 min-h-[30px]',
      button: 'px-4 py-2 rounded bg-blue-500 text-white min-h-[40px]',
      section: 'p-4 border rounded min-h-[100px]'
    };

    const componentActions = isEditing ? (
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <button 
          className="bg-blue-500 text-white p-1 text-xs rounded"
          onClick={(e) => {
            e.stopPropagation();
            duplicateComponent(component.id);
          }}
          title="Duplicate"
        >
          Copy
        </button>
        <button 
          className="bg-red-500 text-white p-1 text-xs rounded"
          onClick={(e) => {
            e.stopPropagation();
            deleteComponent(component.id);
          }}
          title="Delete"
        >
          Delete
        </button>
      </div>
    ) : null;

    switch (type) {
      case 'container':
      case 'section':
        return (
          <div 
            ref={componentRef}
            style={baseStyle}
            className={cn(
              typeStyles[type], 
              editingClasses,
              'w-full relative group'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent(component.id);
            }}
          >
            {children?.map(child => (
              <ComponentRenderer 
                key={child.id} 
                component={child} 
                isEditing={isEditing}
              />
            ))}
            
            {componentActions}
            {renderResizeHandles()}
          </div>
        );
      
      case 'text':
      case 'heading':
        return (
          <div 
            ref={componentRef}
            contentEditable={isEditing && !isInlineEditing}
            suppressContentEditableWarning={true}
            style={baseStyle}
            className={cn(
              typeStyles[type], 
              editingClasses,
              'outline-none cursor-text relative group'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent(component.id);
            }}
            onDoubleClick={handleInlineEditStart}
            onBlur={handleInlineEditEnd}
            onInput={(e) => {
              setEditableContent(e.currentTarget.textContent || '');
            }}
          >
            {isInlineEditing ? editableContent : (props.content || 'Click to edit')}
            
            {componentActions}
            {renderResizeHandles()}
          </div>
        );
      
      case 'button':
        return (
          <button 
            ref={componentRef}
            style={baseStyle}
            className={cn(
              typeStyles[type], 
              editingClasses,
              'w-auto relative group'
            )}
            onClick={isEditing ? (e) => {
              e.preventDefault();
              setSelectedComponent(component.id);
            } : props.onClick}
          >
            {props.content || 'Button'}
            
            {componentActions}
            {renderResizeHandles()}
          </button>
        );
      
      case 'image':
        return (
          <img 
            ref={componentRef as React.RefObject<HTMLImageElement>}
            src={props.src || '/placeholder.png'} 
            alt={props.alt || 'Component Image'}
            style={baseStyle}
            className={cn(
              editingClasses,
              'w-full h-auto object-cover relative group'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent(component.id);
            }}
          >
            {componentActions}
            {renderResizeHandles()}
          </img>
        );
      
      default:
        return <div>Unsupported Component Type: {type}</div>;
    }
  };

  return renderComponentByType();
};
