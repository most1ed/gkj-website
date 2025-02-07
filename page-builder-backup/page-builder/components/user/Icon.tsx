import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';

type IconName = keyof typeof LucideIcons;

interface IconProps {
  name?: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

const defaultProps: IconProps = {
  name: 'CircleIcon',
  size: 24,
  color: '#000000',
  strokeWidth: 2,
  href: '',
  target: '_blank',
};

const IconSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = Object.keys(LucideIcons)
    .filter((iconName) => 
      iconName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 50); // Limit to 50 icons to prevent performance issues

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Icon</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search icons..."
          className="w-full px-3 py-2 border rounded-md"
        />
        <div className="h-48 overflow-y-auto grid grid-cols-5 gap-2 p-2 border rounded-md">
          {filteredIcons.map((iconName) => {
            const IconComp = LucideIcons[iconName as IconName];
            return (
              <button
                key={iconName}
                onClick={() => setProp((props: IconProps) => (props.name = iconName as IconName))}
                className={cn(
                  'p-2 rounded hover:bg-blue-100 transition-colors',
                  props.name === iconName && 'bg-blue-200'
                )}
              >
                <IconComp size={24} className="mx-auto" />
                <span className="text-xs text-center block mt-1">{iconName}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Size</label>
          <input
            type="number"
            value={props.size}
            onChange={(e) =>
              setProp((props: IconProps) => (props.size = Number(e.target.value)))
            }
            min="16"
            max="128"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Stroke Width</label>
          <input
            type="number"
            value={props.strokeWidth}
            onChange={(e) =>
              setProp((props: IconProps) => (props.strokeWidth = Number(e.target.value)))
            }
            min="1"
            max="4"
            step="0.5"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Color</label>
        <input
          type="color"
          value={props.color}
          onChange={(e) =>
            setProp((props: IconProps) => (props.color = e.target.value))
          }
          className="w-full h-10 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Link (Optional)</label>
        <input
          type="text"
          value={props.href}
          onChange={(e) =>
            setProp((props: IconProps) => (props.href = e.target.value))
          }
          placeholder="Enter URL"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {props.href && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Link Target</label>
          <select
            value={props.target}
            onChange={(e) =>
              setProp((props: IconProps) => (props.target = e.target.value as IconProps['target']))
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="_blank">New Tab</option>
            <option value="_self">Same Tab</option>
            <option value="_parent">Parent Frame</option>
            <option value="_top">Full Body</option>
          </select>
        </div>
      )}
    </div>
  );
};

export const Icon = ({
  name,
  size,
  color,
  strokeWidth,
  href,
  target,
}: IconProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const IconComponent = LucideIcons[name || 'CircleIcon'];

  const renderIcon = () => (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'inline-flex items-center justify-center',
        selected && 'outline outline-2 outline-blue-500 p-1'
      )}
    >
      <IconComponent 
        size={size} 
        color={color} 
        strokeWidth={strokeWidth} 
        className="cursor-move"
      />
    </div>
  );

  return href ? (
    <a 
      href={href} 
      target={target} 
      className="inline-block"
    >
      {renderIcon()}
    </a>
  ) : (
    renderIcon()
  );
};

Icon.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: IconSettings,
  },
};
