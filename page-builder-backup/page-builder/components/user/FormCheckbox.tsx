import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

interface FormCheckboxProps {
  label?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  description?: string;
}

const defaultProps: FormCheckboxProps = {
  label: 'Checkbox Label',
  name: 'checkbox',
  checked: false,
  disabled: false,
  required: false,
  description: '',
};

export const FormCheckbox = ({
  label,
  name,
  checked,
  disabled,
  required,
  description,
}: FormCheckboxProps) => {
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
        'relative flex items-start space-x-3',
        selected && 'outline outline-2 outline-blue-500 p-2'
      )}
    >
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          required={required}
          className={cn(
            'h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onChange={(e) => 
            setProp((props: FormCheckboxProps) => (props.checked = e.target.checked))
          }
        />
      </div>
      <div className="min-w-0 flex-1 text-sm">
        <label 
          className={cn(
            'font-medium text-gray-700',
            required && 'after:content-["*"] after:text-red-500 after:ml-1'
          )}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

const FormCheckboxSettings = () => {
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
            setProp((props: FormCheckboxProps) => (props.label = e.target.value))
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          value={props.name}
          onChange={(e) =>
            setProp((props: FormCheckboxProps) => (props.name = e.target.value))
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={props.description}
          onChange={(e) =>
            setProp((props: FormCheckboxProps) => (props.description = e.target.value))
          }
          className="w-full px-3 py-2 border rounded-md"
          rows={2}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="checked"
          checked={props.checked}
          onChange={(e) =>
            setProp((props: FormCheckboxProps) => (props.checked = e.target.checked))
          }
        />
        <label htmlFor="checked" className="text-sm">Checked</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="required"
          checked={props.required}
          onChange={(e) =>
            setProp((props: FormCheckboxProps) => (props.required = e.target.checked))
          }
        />
        <label htmlFor="required" className="text-sm">Required</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="disabled"
          checked={props.disabled}
          onChange={(e) =>
            setProp((props: FormCheckboxProps) => (props.disabled = e.target.checked))
          }
        />
        <label htmlFor="disabled" className="text-sm">Disabled</label>
      </div>
    </div>
  );
};

FormCheckbox.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: FormCheckboxSettings,
  },
};
