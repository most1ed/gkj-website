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
    updateComponent
  } = usePageBuilderStore();

  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(component.props.content || '');
  const contentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (isEditing) {
      e.dataTransfer?.setData('text/plain', component.id);
      onDragStart?.(component.id);
      componentRef.current?.classList.add('opacity-50');
    }
  };

  const handleDragEnd = () => {
    onDragEnd?.();
    componentRef.current?.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (isEditing) {
      e.preventDefault();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (isEditing) {
      e.preventDefault();
      const draggedComponentId = e.dataTransfer?.getData('text/plain');
      if (draggedComponentId && draggedComponentId !== component.id) {
        onDrop?.(component.id);
      }
    }
  };

  const renderComponentByType = () => {
    const { type, props, children } = component;
    const baseStyle = props.style || {};

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
            draggable={isEditing}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {children?.map(child => (
              <ComponentRenderer 
                key={child.id} 
                component={child} 
                isEditing={isEditing}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDrop={onDrop}
              />
            ))}
            
            {isEditing && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="bg-red-500 text-white p-1 text-xs rounded m-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComponent(component.id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
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
              'outline-none cursor-text'
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
            draggable={isEditing}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {isInlineEditing ? editableContent : (props.content || 'Click to edit')}
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
              'w-auto'
            )}
            onClick={isEditing ? (e) => {
              e.preventDefault();
              setSelectedComponent(component.id);
            } : props.onClick}
            draggable={isEditing}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {props.content || 'Button'}
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
              'w-full h-auto object-cover'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent(component.id);
            }}
            draggable={isEditing}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        );
      
      default:
        return <div>Unsupported Component Type: {type}</div>;
    }
  };

  return renderComponentByType();
};
