import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';

interface ButtonProps {
  text: string;
  href?: string;
  variant: 'default' | 'outline' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg' | 'xl';
  color: string;
  fullWidth?: boolean;
  disabled?: boolean;
  target?: '_self' | '_blank';
}

const defaultProps: ButtonProps = {
  text: 'Click me',
  variant: 'default',
  size: 'md',
  color: '#000',
  fullWidth: false,
  disabled: false,
  target: '_self',
};

const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const buttonVariants = [
    { value: 'default', label: 'Default' },
    { value: 'outline', label: 'Outline' },
    { value: 'ghost', label: 'Ghost' },
    { value: 'link', label: 'Link' },
  ];

  const buttonSizes = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Button Text</label>
        <input
          type="text"
          value={props.text}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.text = e.target.value))
          }
          placeholder="Enter button text"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Button URL</label>
        <input
          type="text"
          value={props.href}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.href = e.target.value))
          }
          placeholder="Enter URL (optional)"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Variant</label>
          <select
            value={props.variant}
            onChange={(e) =>
              setProp(
                (props: ButtonProps) => (props.variant = e.target.value as ButtonProps['variant'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {buttonVariants.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Size</label>
          <select
            value={props.size}
            onChange={(e) =>
              setProp(
                (props: ButtonProps) => (props.size = e.target.value as ButtonProps['size'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {buttonSizes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Color</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={props.color}
            onChange={(e) =>
              setProp((props: ButtonProps) => (props.color = e.target.value))
            }
            className="w-12 h-12 p-1 border rounded-md"
          />
          <input
            type="text"
            value={props.color}
            onChange={(e) =>
              setProp((props: ButtonProps) => (props.color = e.target.value))
            }
            placeholder="Color (hex)"
            className="flex-grow px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="fullWidth"
            checked={props.fullWidth}
            onChange={(e) =>
              setProp((props: ButtonProps) => (props.fullWidth = e.target.checked))
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
              setProp((props: ButtonProps) => (props.disabled = e.target.checked))
            }
          />
          <label htmlFor="disabled" className="text-sm">Disabled</label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Target</label>
        <select
          value={props.target}
          onChange={(e) =>
            setProp(
              (props: ButtonProps) => (props.target = e.target.value as ButtonProps['target'])
            )
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="_self">Same Window</option>
          <option value="_blank">New Window</option>
        </select>
      </div>
    </div>
  );
};

export const Button = ({
  text,
  href,
  variant,
  size,
  color,
  fullWidth,
  disabled,
  target,
}: ButtonProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const renderButton = () => {
    const buttonClasses = cn(
      'inline-flex items-center justify-center transition-colors duration-200',
      variant === 'default' && 'bg-blue-500 text-white hover:bg-blue-600',
      variant === 'outline' && 'border border-blue-500 text-blue-500 hover:bg-blue-50',
      variant === 'ghost' && 'hover:bg-gray-100 text-blue-500',
      variant === 'link' && 'text-blue-500 hover:underline',
      size === 'sm' && 'px-2 py-1 text-xs',
      size === 'md' && 'px-4 py-2 text-sm',
      size === 'lg' && 'px-6 py-3 text-base',
      size === 'xl' && 'px-8 py-4 text-lg',
      fullWidth && 'w-full',
      disabled && 'opacity-50 cursor-not-allowed'
    );

    return (
      <button
        className={buttonClasses}
        style={{ backgroundColor: color }}
        disabled={disabled}
      >
        {text || 'Button'}
      </button>
    );
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'relative p-2',
        selected && 'outline outline-2 outline-blue-500'
      )}
    >
      {href ? (
        <a href={href} target={target}>
          {renderButton()}
        </a>
      ) : (
        renderButton()
      )}
    </div>
  );
};

Button.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: ButtonSettings,
  },
};
