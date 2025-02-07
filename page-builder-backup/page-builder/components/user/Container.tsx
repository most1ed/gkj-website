import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';

interface ContainerProps {
  background?: string;
  backgroundColor?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  borderRadius?: string;
  customBorderRadius?: string;
  border?: boolean;
  borderColor?: string;
  borderWidth?: string;
  boxShadow?: boolean;
  shadowColor?: string;
  shadowSpread?: string;
  children?: React.ReactNode;
  flexDirection?: 'row' | 'column';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}

const defaultProps: ContainerProps = {
  background: 'transparent',
  padding: 'md',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const ContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const backgroundOptions = [
    { value: 'transparent', label: 'Transparent' },
    { value: 'white', label: 'White' },
    { value: 'gray', label: 'Gray' },
    { value: 'black', label: 'Black' },
    { value: 'custom', label: 'Custom Color' },
  ];

  const paddingOptions = [
    { value: 'none', label: 'None' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'custom', label: 'Custom' },
  ];

  const borderRadiusOptions = [
    { value: 'none', label: 'None' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'full', label: 'Full' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Background</label>
        <select
          value={props.background}
          onChange={(e) =>
            setProp(
              (props: ContainerProps) => (props.background = e.target.value as ContainerProps['background'])
            )
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          {backgroundOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {props.background === 'custom' && (
          <input
            type="color"
            value={props.backgroundColor}
            onChange={(e) =>
              setProp((props: ContainerProps) => (props.backgroundColor = e.target.value))
            }
            className="w-full px-3 py-2 border rounded-md"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Padding</label>
          <select
            value={props.padding}
            onChange={(e) =>
              setProp(
                (props: ContainerProps) => (props.padding = e.target.value as ContainerProps['padding'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {paddingOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {props.padding === 'custom' && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              <input
                type="text"
                placeholder="Top"
                value={props.paddingTop}
                onChange={(e) =>
                  setProp((props: ContainerProps) => (props.paddingTop = e.target.value))
                }
                className="px-2 py-1 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Right"
                value={props.paddingRight}
                onChange={(e) =>
                  setProp((props: ContainerProps) => (props.paddingRight = e.target.value))
                }
                className="px-2 py-1 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Bottom"
                value={props.paddingBottom}
                onChange={(e) =>
                  setProp((props: ContainerProps) => (props.paddingBottom = e.target.value))
                }
                className="px-2 py-1 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Left"
                value={props.paddingLeft}
                onChange={(e) =>
                  setProp((props: ContainerProps) => (props.paddingLeft = e.target.value))
                }
                className="px-2 py-1 border rounded-md text-sm"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Border Radius</label>
          <select
            value={props.borderRadius}
            onChange={(e) =>
              setProp(
                (props: ContainerProps) => (props.borderRadius = e.target.value as ContainerProps['borderRadius'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {borderRadiusOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {props.borderRadius === 'custom' && (
            <input
              type="text"
              placeholder="Custom border radius (e.g., 10px)"
              value={props.customBorderRadius}
              onChange={(e) =>
                setProp((props: ContainerProps) => (props.customBorderRadius = e.target.value))
              }
              className="w-full px-3 py-2 border rounded-md mt-2"
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="border"
            checked={props.border}
            onChange={(e) =>
              setProp((props: ContainerProps) => (props.border = e.target.checked))
            }
          />
          <label htmlFor="border" className="text-sm">Add Border</label>
        </div>

        {props.border && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Border Color</label>
              <input
                type="color"
                value={props.borderColor}
                onChange={(e) =>
                  setProp((props: ContainerProps) => (props.borderColor = e.target.value))
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Border Width</label>
              <input
                type="text"
                value={props.borderWidth}
                onChange={(e) =>
                  setProp((props: ContainerProps) => (props.borderWidth = e.target.value))
                }
                placeholder="e.g., 1px, 2px"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="boxShadow"
            checked={props.boxShadow}
            onChange={(e) =>
              setProp((props: ContainerProps) => (props.boxShadow = e.target.checked))
            }
          />
          <label htmlFor="boxShadow" className="text-sm">Add Box Shadow</label>
        </div>

        {props.boxShadow && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Shadow Color</label>
              <input
                type="color"
                value={props.shadowColor}
                onChange={(e) =>
                  setProp((props: ContainerProps) => (props.shadowColor = e.target.value))
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Shadow Spread</label>
              <input
                type="text"
                value={props.shadowSpread}
                onChange={(e) =>
                  setProp((props: ContainerProps) => (props.shadowSpread = e.target.value))
                }
                placeholder="e.g., 5px"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Container = ({
  background,
  backgroundColor,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  borderRadius,
  customBorderRadius,
  border,
  borderColor,
  borderWidth,
  boxShadow,
  shadowColor,
  shadowSpread,
  children,
  flexDirection,
  alignItems,
  justifyContent,
}: ContainerProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const containerStyle = {
    backgroundColor:
      background === 'custom' ? backgroundColor : `var(--${background})`,
    padding:
      padding === 'custom'
        ? `${paddingTop || 0} ${paddingRight || 0} ${paddingBottom || 0} ${
            paddingLeft || 0
          }`
        : `var(--padding-${padding})`,
    borderRadius:
      borderRadius === 'custom'
        ? customBorderRadius
        : `var(--border-radius-${borderRadius})`,
    border: border
      ? `${borderWidth || '1px'} solid ${borderColor || 'currentColor'}`
      : 'none',
    boxShadow: boxShadow
      ? `0 0 ${shadowSpread || '5px'} ${shadowColor || 'rgba(0,0,0,0.1)'}`
      : 'none',
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      style={containerStyle}
      className={cn(
        'relative',
        selected && 'outline outline-2 outline-blue-500'
      )}
    >
      {children}
    </div>
  );
};

Container.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: true,
    canMoveIn: true,
    canMoveOut: true,
  },
  related: {
    settings: ContainerSettings,
  },
};
