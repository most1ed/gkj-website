import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

interface FormSelectProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  multiple?: boolean;
}

const defaultProps: FormSelectProps = {
  label: 'Select Option',
  placeholder: 'Choose an option',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
  required: false,
  fullWidth: true,
  disabled: false,
  multiple: false,
};

const FormSelectSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const handleOptionsChange = (index: number, field: 'value' | 'label', value: string) => {
    setProp((props: FormSelectProps) => {
      const newOptions = [...props.options];
      newOptions[index] = { ...newOptions[index], [field]: value };
      props.options = newOptions;
    });
  };

  const addOption = () => {
    setProp((props: FormSelectProps) => {
      props.options.push({
        value: `option${props.options.length + 1}`,
        label: `Option ${props.options.length + 1}`,
      });
    });
  };

  const removeOption = (index: number) => {
    setProp((props: FormSelectProps) => {
      props.options.splice(index, 1);
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Label</label>
        <input
          type="text"
          value={props.label}
          onChange={(e) =>
            setProp((props: FormSelectProps) => (props.label = e.target.value))
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
            setProp((props: FormSelectProps) => (props.placeholder = e.target.value))
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Options</label>
          <button 
            onClick={addOption}
            className="text-xs text-blue-600 hover:underline"
          >
            + Add Option
          </button>
        </div>
        <div className="space-y-2">
          {props.options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={option.value}
                onChange={(e) => handleOptionsChange(index, 'value', e.target.value)}
                placeholder="Value"
                className="flex-1 px-2 py-1 border rounded-md text-sm"
              />
              <input
                type="text"
                value={option.label}
                onChange={(e) => handleOptionsChange(index, 'label', e.target.value)}
                placeholder="Label"
                className="flex-1 px-2 py-1 border rounded-md text-sm"
              />
              {props.options.length > 1 && (
                <button 
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:bg-red-50 rounded-full p-1"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="required"
          checked={props.required}
          onChange={(e) =>
            setProp((props: FormSelectProps) => (props.required = e.target.checked))
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
            setProp((props: FormSelectProps) => (props.fullWidth = e.target.checked))
          }
        />
        <label htmlFor="fullWidth" className="text-sm">Full Width</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="multiple"
          checked={props.multiple}
          onChange={(e) =>
            setProp((props: FormSelectProps) => (props.multiple = e.target.checked))
          }
        />
        <label htmlFor="multiple" className="text-sm">Multiple Selection</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="disabled"
          checked={props.disabled}
          onChange={(e) =>
            setProp((props: FormSelectProps) => (props.disabled = e.target.checked))
          }
        />
        <label htmlFor="disabled" className="text-sm">Disabled</label>
      </div>
    </div>
  );
};

export const FormSelect = ({
  label,
  placeholder,
  options,
  required,
  fullWidth,
  disabled,
  multiple,
}: FormSelectProps) => {
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
        'relative w-full',
        selected && 'outline outline-2 outline-blue-500',
        fullWidth ? 'w-full' : 'w-auto',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {label && (
        <label 
          className={cn(
            'block text-sm font-medium text-gray-700 mb-1',
            required && 'after:content-["*"] after:ml-0.5 after:text-red-500'
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          disabled={disabled}
          multiple={multiple}
          required={required}
          placeholder={placeholder}
          className={cn(
            'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
            disabled && 'cursor-not-allowed',
            multiple && 'h-24'
          )}
        >
          {!multiple && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option 
              key={index} 
              value={option.value}
              className="text-sm"
            >
              {option.label}
            </option>
          ))}
        </select>
        {!multiple && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDownIcon size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

FormSelect.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: FormSelectSettings,
  },
};
