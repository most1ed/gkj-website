import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { InputIcon, TypeIcon } from 'lucide-react';

interface FormInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

const defaultProps: FormInputProps = {
  label: 'Input Label',
  placeholder: 'Enter text',
  type: 'text',
  required: false,
  fullWidth: true,
  disabled: false,
  validation: {},
};

export const FormInput = ({
  label,
  placeholder,
  type,
  required,
  fullWidth,
  disabled,
  validation,
}: FormInputProps) => {
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
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        minLength={validation?.minLength}
        maxLength={validation?.maxLength}
        pattern={validation?.pattern}
        className={cn(
          'border border-gray-300 rounded-md shadow-sm',
          'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'px-3 py-2 text-sm',
          fullWidth && 'w-full',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onBlur={(e) => {
          setProp((props: FormInputProps) => {
            props.placeholder = e.target.value || placeholder;
          });
        }}
      />
    </div>
  );
};

const FormInputSettings = () => {
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
            setProp((props: FormInputProps) => (props.label = e.target.value))
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
            setProp((props: FormInputProps) => (props.placeholder = e.target.value))
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Input Type</label>
        <select
          value={props.type}
          onChange={(e) =>
            setProp((props: FormInputProps) => (props.type = e.target.value as FormInputProps['type']))
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="tel">Telephone</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="required"
          checked={props.required}
          onChange={(e) =>
            setProp((props: FormInputProps) => (props.required = e.target.checked))
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
            setProp((props: FormInputProps) => (props.fullWidth = e.target.checked))
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
            setProp((props: FormInputProps) => (props.disabled = e.target.checked))
          }
        />
        <label htmlFor="disabled" className="text-sm">Disabled</label>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Validation</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs">Min Length</label>
            <input
              type="number"
              value={props.validation?.minLength || ''}
              onChange={(e) =>
                setProp((props: FormInputProps) => {
                  props.validation = {
                    ...props.validation,
                    minLength: e.target.value ? Number(e.target.value) : undefined,
                  };
                })
              }
              className="w-full px-2 py-1 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-xs">Max Length</label>
            <input
              type="number"
              value={props.validation?.maxLength || ''}
              onChange={(e) =>
                setProp((props: FormInputProps) => {
                  props.validation = {
                    ...props.validation,
                    maxLength: e.target.value ? Number(e.target.value) : undefined,
                  };
                })
              }
              className="w-full px-2 py-1 border rounded-md text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-xs">Regex Pattern</label>
          <input
            type="text"
            value={props.validation?.pattern || ''}
            onChange={(e) =>
              setProp((props: FormInputProps) => {
                props.validation = {
                  ...props.validation,
                  pattern: e.target.value || undefined,
                };
              })
            }
            placeholder="e.g. ^[A-Za-z]+$"
            className="w-full px-2 py-1 border rounded-md text-sm"
          />
        </div>
      </div>
    </div>
  );
};

FormInput.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: FormInputSettings,
  },
};
