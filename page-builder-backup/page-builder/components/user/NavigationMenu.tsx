import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { 
  MenuIcon, 
  XIcon, 
  ChevronDownIcon, 
  HomeIcon, 
  InfoIcon, 
  ContactIcon, 
  FileTextIcon 
} from 'lucide-react';
import { useState } from 'react';

interface MenuItemType {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: MenuItemType[];
}

interface NavigationMenuProps {
  items?: MenuItemType[];
  layout?: 'horizontal' | 'vertical';
  variant?: 'default' | 'outlined' | 'underline';
  mobileMenuIcon?: boolean;
  alignment?: 'left' | 'center' | 'right';
}

const defaultProps: NavigationMenuProps = {
  items: [
    { 
      label: 'Home', 
      href: '/', 
      icon: <HomeIcon size={16} /> 
    },
    { 
      label: 'About', 
      href: '/about', 
      icon: <InfoIcon size={16} /> 
    },
    { 
      label: 'Services', 
      href: '/services', 
      icon: <FileTextIcon size={16} />,
      children: [
        { label: 'Web Development', href: '/services/web' },
        { label: 'Mobile Apps', href: '/services/mobile' },
        { label: 'Design', href: '/services/design' },
      ]
    },
    { 
      label: 'Contact', 
      href: '/contact', 
      icon: <ContactIcon size={16} /> 
    },
  ],
  layout: 'horizontal',
  variant: 'default',
  mobileMenuIcon: true,
  alignment: 'center',
};

export const NavigationMenu = ({
  items,
  layout,
  variant,
  mobileMenuIcon,
  alignment,
}: NavigationMenuProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const renderMenuItem = (item: MenuItemType, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openSubmenus.includes(item.label);

    return (
      <div 
        key={item.label} 
        className={cn(
          'relative group',
          layout === 'horizontal' 
            ? 'inline-block' 
            : 'block w-full',
          isMobile && 'border-b last:border-b-0'
        )}
      >
        <a
          href={item.href}
          className={cn(
            'flex items-center gap-2 py-2 px-3 transition-colors',
            variant === 'default' && 'hover:bg-gray-100',
            variant === 'outlined' && 'border border-transparent hover:border-gray-300 rounded',
            variant === 'underline' && 'hover:border-b-2 hover:border-black',
            hasChildren && 'cursor-pointer'
          )}
          onClick={(e) => hasChildren && e.preventDefault()}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
          {hasChildren && (
            <ChevronDownIcon 
              size={16} 
              className={cn(
                'transition-transform',
                isOpen && 'rotate-180'
              )}
              onClick={() => toggleSubmenu(item.label)}
            />
          )}
        </a>

        {hasChildren && (
          <div 
            className={cn(
              'absolute z-10 bg-white shadow-lg rounded-md min-w-[200px]',
              layout === 'horizontal' 
                ? 'top-full left-0 mt-2' 
                : 'relative mt-2',
              !isMobile && (isOpen || 'hidden group-hover:block'),
              isMobile && (!isOpen && 'hidden')
            )}
          >
            {item.children?.map(child => (
              <a
                key={child.label}
                href={child.href}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {child.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'relative',
        selected && 'outline outline-2 outline-blue-500 p-2',
        `justify-${alignment}`
      )}
    >
      {/* Desktop Menu */}
      <nav 
        className={cn(
          'hidden md:flex',
          layout === 'horizontal' 
            ? 'space-x-4 items-center' 
            : 'flex-col space-y-2'
        )}
      >
        {items?.map(item => renderMenuItem(item))}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuIcon && (
        <div className="md:hidden flex items-center justify-between">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      )}

      {mobileMenuIcon && mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-20">
          <nav className="flex flex-col">
            {items?.map(item => renderMenuItem(item, true))}
          </nav>
        </div>
      )}
    </div>
  );
};

const NavigationMenuSettings = () => {
  const {
    actions: { setProp },
    items,
    layout,
    variant,
    mobileMenuIcon,
    alignment,
  } = useNode((node) => ({
    items: node.data.props.items,
    layout: node.data.props.layout,
    variant: node.data.props.variant,
    mobileMenuIcon: node.data.props.mobileMenuIcon,
    alignment: node.data.props.alignment,
  }));

  const addMenuItem = () => {
    setProp((props: NavigationMenuProps) => {
      props.items = props.items ? [
        ...props.items, 
        { 
          label: `Menu Item ${props.items.length + 1}`, 
          href: '#' 
        }
      ] : [{ label: 'New Menu Item', href: '#' }];
    });
  };

  const removeMenuItem = (indexToRemove: number) => {
    setProp((props: NavigationMenuProps) => {
      props.items = props.items?.filter((_, index) => index !== indexToRemove);
    });
  };

  const updateMenuItem = (index: number, updates: Partial<MenuItemType>) => {
    setProp((props: NavigationMenuProps) => {
      if (props.items) {
        props.items[index] = { ...props.items[index], ...updates };
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Layout</label>
        <select
          value={layout}
          onChange={(e) => 
            setProp((props: NavigationMenuProps) => 
              props.layout = e.target.value as 'horizontal' | 'vertical'
            )
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Variant</label>
        <select
          value={variant}
          onChange={(e) => 
            setProp((props: NavigationMenuProps) => 
              props.variant = e.target.value as 'default' | 'outlined' | 'underline'
            )
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="default">Default</option>
          <option value="outlined">Outlined</option>
          <option value="underline">Underline</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Alignment</label>
        <select
          value={alignment}
          onChange={(e) => 
            setProp((props: NavigationMenuProps) => 
              props.alignment = e.target.value as 'left' | 'center' | 'right'
            )
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={mobileMenuIcon}
            onChange={(e) => 
              setProp((props: NavigationMenuProps) => 
                props.mobileMenuIcon = e.target.checked
              )
            }
          />
          <span>Show Mobile Menu Icon</span>
        </label>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium">Menu Items</h4>
          <button 
            onClick={addMenuItem}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
          >
            Add Item
          </button>
        </div>

        {items?.map((item, index) => (
          <div key={index} className="border p-2 rounded space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Item {index + 1}</span>
              <button 
                onClick={() => removeMenuItem(index)}
                className="text-red-500 text-xs"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Label"
              value={item.label}
              onChange={(e) => updateMenuItem(index, { label: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
            <input
              type="text"
              placeholder="URL/Href"
              value={item.href}
              onChange={(e) => updateMenuItem(index, { href: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

NavigationMenu.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: NavigationMenuSettings,
  },
};
