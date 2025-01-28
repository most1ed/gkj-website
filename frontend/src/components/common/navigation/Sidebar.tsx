import React, { useState, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Church, 
  GraduationCap, 
  DollarSign, 
  Boxes, 
  MessageCircle, 
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Type Definitions
export interface MenuItemType {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: MenuItemType[];
  permissions?: string[];
  badge?: { 
    text: string; 
    variant: 'default' | 'destructive' | 'outline' | 'secondary' 
  };
}

// Utility Functions
const useMenuState = (initialItems: MenuItemType[]) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const toggleItemExpansion = useCallback((itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const isItemExpanded = useCallback((itemId: string) => {
    return expandedItems.includes(itemId);
  }, [expandedItems]);

  const isItemActive = useCallback((href?: string) => {
    return href ? location.pathname === href : false;
  }, [location]);

  return { 
    toggleItemExpansion, 
    isItemExpanded, 
    isItemActive 
  };
};

// Menu Configuration
export const SIDEBAR_MENU: MenuItemType[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    permissions: ['admin', 'user']
  },
  {
    id: 'jemaat',
    title: 'Jemaat',
    icon: Users,
    permissions: ['admin', 'staff'],
    children: [
      {
        id: 'jemaat-data',
        title: 'Data Jemaat',
        icon: Users,
        href: '/dashboard/jemaat/data',
        badge: { 
          text: 'Baru', 
          variant: 'default' 
        }
      },
      {
        id: 'jemaat-register',
        title: 'Pendaftaran',
        icon: Users,
        href: '/dashboard/jemaat/register'
      }
    ]
  },
  {
    id: 'ibadah',
    title: 'Ibadah',
    icon: Church,
    permissions: ['admin', 'staff'],
    children: [
      {
        id: 'ibadah-jadwal',
        title: 'Jadwal Ibadah',
        icon: Church,
        href: '/dashboard/ibadah/jadwal'
      }
    ]
  },
  {
    id: 'help',
    title: 'Bantuan',
    icon: HelpCircle,
    href: '/dashboard/help',
    permissions: ['admin', 'user', 'staff']
  },
  {
    id: 'logout',
    title: 'Keluar',
    icon: LogOut,
    href: '/logout',
    permissions: ['admin', 'user', 'staff']
  }
];

// Menu Item Component
const MenuItem: React.FC<{
  item: MenuItemType;
  depth?: number;
  isCollapsed?: boolean;
  onToggle?: (id: string) => void;
  isExpanded?: boolean;
  isActive?: boolean;
}> = ({ 
  item, 
  depth = 0, 
  isCollapsed = false, 
  onToggle, 
  isExpanded = false,
  isActive = false
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  const renderContent = () => (
    <div 
      className={cn(
        'flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors duration-200',
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800',
        depth > 0 ? `pl-${depth * 4 + 4}` : ''
      )}
    >
      <div className="flex items-center space-x-2">
        <Icon className={cn(
          'w-5 h-5', 
          isActive ? 'text-primary' : 'text-gray-500'
        )} />
        {!isCollapsed && <span className="text-sm">{item.title}</span>}
      </div>

      {!isCollapsed && hasChildren && (
        isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )
      )}
    </div>
  );

  const menuItemProps = {
    onClick: () => {
      if (hasChildren && onToggle) {
        onToggle(item.id);
      }
    },
    className: cn(
      'cursor-pointer',
      isCollapsed ? 'flex justify-center' : ''
    )
  };

  return (
    <div>
      {item.href ? (
        <Link to={item.href} {...menuItemProps}>
          {renderContent()}
        </Link>
      ) : (
        <div {...menuItemProps}>
          {renderContent()}
        </div>
      )}

      {hasChildren && !isCollapsed && isExpanded && (
        <div className="pl-4">
          {item.children?.map(child => (
            <MenuItem 
              key={child.id}
              item={child}
              depth={depth + 1}
              isCollapsed={isCollapsed}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Sidebar Component
export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRole] = useState<string>('admin');

  const { 
    toggleItemExpansion, 
    isItemExpanded, 
    isItemActive 
  } = useMenuState(SIDEBAR_MENU);

  const filteredMenu = useMemo(() => {
    return SIDEBAR_MENU.filter(item => 
      !item.permissions || item.permissions.includes(userRole)
    );
  }, [userRole]);

  return (
    <aside 
      className={cn(
        'h-screen bg-white dark:bg-gray-900 border-r transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h2>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </button>
      </div>

      <nav className="py-4 overflow-y-auto max-h-[calc(100vh-100px)]">
        {filteredMenu.map(item => (
          <MenuItem 
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            onToggle={toggleItemExpansion}
            isExpanded={isItemExpanded(item.id)}
            isActive={isItemActive(item.href)}
          />
        ))}
      </nav>
    </aside>
  );
};
