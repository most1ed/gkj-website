import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { 
  HomeIcon, 
  ChevronRightIcon 
} from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: 'chevron' | 'slash' | 'dot';
  homeIcon?: boolean;
  uppercase?: boolean;
  alignment?: 'left' | 'center' | 'right';
}

const defaultProps: BreadcrumbProps = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Current Page' },
  ],
  separator: 'chevron',
  homeIcon: true,
  uppercase: false,
  alignment: 'left',
};

const BreadcrumbSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const addBreadcrumbItem = () => {
    setProp((props: BreadcrumbProps) => {
      props.items?.push({ 
        label: `Page ${(props.items?.length || 0) + 1}`, 
        href: '/' 
      });
    });
  };

  const updateBreadcrumbItem = (index: number, updates: Partial<BreadcrumbItem>) => {
    setProp((props: BreadcrumbProps) => {
      if (props.items) {
        props.items[index] = { ...props.items[index], ...updates };
      }
    });
  };

  const removeBreadcrumbItem = (index: number) => {
    setProp((props: BreadcrumbProps) => {
      if (props.items) {
        props.items.splice(index, 1);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Separator</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="chevron"
              checked={props.separator === 'chevron'}
              onChange={() =>
                setProp((props: BreadcrumbProps) => (props.separator = 'chevron'))
              }
            />
            Chevron
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="slash"
              checked={props.separator === 'slash'}
              onChange={() =>
                setProp((props: BreadcrumbProps) => (props.separator = 'slash'))
              }
            />
            Slash
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="dot"
              checked={props.separator === 'dot'}
              onChange={() =>
                setProp((props: BreadcrumbProps) => (props.separator = 'dot'))
              }
            />
            Dot
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Alignment</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="left"
              checked={props.alignment === 'left'}
              onChange={() =>
                setProp((props: BreadcrumbProps) => (props.alignment = 'left'))
              }
            />
            Left
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="center"
              checked={props.alignment === 'center'}
              onChange={() =>
                setProp((props: BreadcrumbProps) => (props.alignment = 'center'))
              }
            />
            Center
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="right"
              checked={props.alignment === 'right'}
              onChange={() =>
                setProp((props: BreadcrumbProps) => (props.alignment = 'right'))
              }
            />
            Right
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="homeIcon"
          checked={props.homeIcon}
          onChange={(e) =>
            setProp((props: BreadcrumbProps) => (props.homeIcon = e.target.checked))
          }
        />
        <label htmlFor="homeIcon" className="text-sm">Show Home Icon</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="uppercase"
          checked={props.uppercase}
          onChange={(e) =>
            setProp((props: BreadcrumbProps) => (props.uppercase = e.target.checked))
          }
        />
        <label htmlFor="uppercase" className="text-sm">Uppercase</label>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Breadcrumb Items</label>
          <button 
            onClick={addBreadcrumbItem}
            className="text-xs text-blue-600 hover:underline"
          >
            + Add Item
          </button>
        </div>
        <div className="space-y-2">
          {props.items?.map((item, index) => (
            <div key={index} className="space-y-2 p-2 border rounded-md">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Title</label>
                {props.items && props.items.length > 1 && (
                  <button 
                    onClick={() => removeBreadcrumbItem(index)}
                    className="text-red-500 hover:bg-red-50 rounded-full p-1"
                  >
                    ✕
                  </button>
                )}
              </div>
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateBreadcrumbItem(index, { label: e.target.value })}
                placeholder="Item Label"
                className="w-full px-3 py-2 border rounded-md"
              />
              <label className="text-sm font-medium">Link</label>
              <input
                type="text"
                value={item.href}
                onChange={(e) => updateBreadcrumbItem(index, { href: e.target.value })}
                placeholder="Item Link"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Breadcrumb = ({
  items,
  separator,
  homeIcon,
  uppercase,
  alignment,
}: BreadcrumbProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const renderSeparator = () => {
    switch (separator) {
      case 'slash':
        return <span className="mx-2 text-gray-400">/</span>;
      case 'dot':
        return <span className="mx-2 text-gray-400">•</span>;
      default:
        return <ChevronRightIcon size={16} className="mx-2 text-gray-400" />;
    }
  };

  return (
    <nav
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'flex items-center',
        `justify-${alignment}`,
        selected && 'outline outline-2 outline-blue-500 p-2'
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {items?.map((item, index) => {
          const isLast = index === (items.length - 1);
          
          return (
            <li 
              key={index} 
              className="flex items-center"
            >
              {index > 0 && renderSeparator()}
              
              {(homeIcon && index === 0) ? (
                <HomeIcon 
                  size={16} 
                  className={cn(
                    'mr-2',
                    item.href && 'text-blue-600 hover:text-blue-800'
                  )}
                />
              ) : null}

              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className={cn(
                    'text-gray-500 hover:text-gray-700 transition-colors',
                    uppercase && 'uppercase',
                    'text-sm'
                  )}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'text-gray-900 font-semibold',
                    uppercase && 'uppercase',
                    'text-sm'
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: BreadcrumbSettings,
  },
};
