import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Widget } from '../../types/dashboard.types';
import BaseWidget from './BaseWidget';

interface WidgetWrapperProps {
  widget: Widget;
  onRemove?: (id: string) => void;
}

const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ widget, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="widget-wrapper"
    >
      <div {...attributes} {...listeners} className="widget-drag-handle">
        <BaseWidget id={widget.id} title={widget.title}>
          <widget.component />
          {onRemove && (
            <button 
              onClick={() => onRemove(widget.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          )}
        </BaseWidget>
      </div>
    </div>
  );
};

export default WidgetWrapper;
