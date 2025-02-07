import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { TextIcon } from 'lucide-react';

interface FormTextareaProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
}

const defaultProps: FormTextareaProps = {
  label: 'Message',
  placeholder: 'Enter your message...',
  rows: 4,
  required: false,
  fullWidth: true,
  disabled: false,
  maxLength: 500,
  minLength: 10,
};

export const FormTextarea = ({
  label,
  placeholder,
  rows,
  required,
  fullWidth,
  disabled,
  maxLength,
  minLength,
}: FormTextareaProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'relative space-y-2',
        selected && 'outline outline-2 outline-blue-500 p-2'
      )}
    >
      {label && (
        <label 
          className={cn(
            'block text-sm font-medium text-gray-700',
            required && 'after:content-["*"] after:text-red-500 after:ml-1'
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          rows={rows}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          className={cn(
            'border border-gray-300 rounded-md shadow-sm',
            'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'px-3 py-2 text-sm resize-y',
            fullWidth && 'w-full',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onBlur={(e) => {
            setProp((props: FormTextareaProps) => {
              props.placeholder = e.target.value || placeholder;
            });
          }}
        />
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {/* Optional character count */}
          </div>
        )}
      </div>
    </div>
  );
};

const FormTextareaSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Label</label>
        <input
          type="text"
          value={props.label}
          onChange={(e) =>
            setProp((props: FormTextareaProps) => (props.label = e.target.value))
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Placeholder</label>
        <input
          type="text"
          value={props.placeholder}
          onChange={(e) =>
            setProp((props: FormTextareaProps) => (props.placeholder = e.target.value))
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Rows</label>
          <input
            type="number"
            value={props.rows}
            onChange={(e) =>
              setProp((props: FormTextareaProps) => (props.rows = Number(e.target.value)))
            }
            min="1"
            max="20"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Length</label>
          <input
            type="number"
            value={props.maxLength}
            onChange={(e) =>
              setProp((props: FormTextareaProps) => (props.maxLength = Number(e.target.value)))
            }
            min="10"
            max="1000"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Min Length</label>
          <input
            type="number"
            value={props.minLength}
            onChange={(e) =>
              setProp((props: FormTextareaProps) => (props.minLength = Number(e.target.value)))
            }
            min="0"
            max="500"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="required"
          checked={props.required}
          onChange={(e) =>
            setProp((props: FormTextareaProps) => (props.required = e.target.checked))
          }
        />
        <label htmlFor="required" className="text-sm">Required</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="fullWidth"
          checked={props.fullWidth}
          onChange={(e) =>
            setProp((props: FormTextareaProps) => (props.fullWidth = e.target.checked))
          }
        />
        <label htmlFor="fullWidth" className="text-sm">Full Width</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="disabled"
          checked={props.disabled}
          onChange={(e) =>
            setProp((props: FormTextareaProps) => (props.disabled = e.target.checked))
          }
        />
        <label htmlFor="disabled" className="text-sm">Disabled</label>
      </div>
    </div>
  );
};

FormTextarea.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: FormTextareaSettings,
  },
};
