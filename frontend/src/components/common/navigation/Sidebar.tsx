import React, { useState, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  User,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Church,
  HeartHandshake,
  Wallet,
  Layout,
  Image,
  FileEdit,
  Book,
  Database,
  Settings,
  ClipboardList,
  UserCircle,
  UsersRound,
  ScrollText,
  Building,
  Network,
  PieChart,
  BarChart3,
  FileBarChart,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

// Type Definitions
export interface MenuItemType {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: MenuItemType[];
  roles?: string[];
}

// Menu Configuration
export const SIDEBAR_MENU: MenuItemType[] = [
  // Dashboard - Untuk Semua Role
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    href: '/panel',
    roles: ['ADMIN', 'MAJELIS', 'WARGA']
  },

  // Profile & Layanan - Untuk Role WARGA
  {
    id: 'profile',
    title: 'Profil & Layanan',
    icon: UserCircle,
    href: '/panel/profile',
    roles: ['WARGA']
  },

  // Sekretariat - Untuk Role ADMIN & MAJELIS
  {
    id: 'sekretariat',
    title: 'Sekretariat',
    icon: ClipboardList,
    href: '/panel/sekretariat',
    roles: ['ADMIN', 'MAJELIS']
  },

  // Ibadah & Pelayanan - Untuk Role ADMIN & MAJELIS
  {
    id: 'pelayanan',
    title: 'Ibadah & Pelayanan',
    icon: HeartHandshake,
    href: '/panel/pelayanan',
    roles: ['ADMIN', 'MAJELIS']
  },

  // Keuangan - Untuk Role ADMIN & MAJELIS
  {
    id: 'keuangan',
    title: 'Keuangan',
    icon: Wallet,
    href: '/panel/keuangan',
    roles: ['ADMIN', 'MAJELIS']
  },

  // Manajemen Konten - Untuk Role ADMIN
  {
    id: 'konten',
    title: 'Manajemen Konten',
    icon: Layout,
    href: '/panel/konten',
    roles: ['ADMIN']
  },

  // Anggaran - Untuk Role ADMIN
  {
    id: 'anggaran',
    title: 'Anggaran',
    icon: FileBarChart,
    href: '/panel/anggaran',
    roles: ['ADMIN']
  },

  // Master & Pengaturan - Untuk Role ADMIN
  {
    id: 'pengaturan',
    title: 'Master & Pengaturan',
    icon: Settings,
    href: '/panel/pengaturan',
    roles: ['ADMIN']
  }
];

// Utility Functions
const useMenuState = (initialItems: MenuItemType[]) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const { user } = useAuth();

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
    if (!href) return false;
    return location.pathname.startsWith(href);
  }, [location]);

  // Temporarily show all menus for development
  const filteredMenu = useMemo(() => {
    return initialItems;
  }, [initialItems]);

  return { 
    toggleItemExpansion, 
    isItemExpanded, 
    isItemActive,
    filteredMenu
  };
};

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

  return (
    <div className={cn(
      "flex flex-col",
      depth > 0 && "ml-4"
    )}>
      <Link
        to={item.href || '#'}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
          "hover:bg-accent/50",
          isActive && "bg-accent text-accent-foreground",
          !isCollapsed && "justify-start",
          isCollapsed && "justify-center"
        )}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            onToggle?.(item.id);
          }
        }}
      >
        <Icon className="w-5 h-5" />
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {hasChildren && (
              <ChevronRight 
                className={cn(
                  "w-4 h-4 transition-transform",
                  isExpanded && "transform rotate-90"
                )} 
              />
            )}
          </>
        )}
      </Link>

      {hasChildren && isExpanded && !isCollapsed && (
        <AnimatePresence initial={false}>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-1">
              {item.children.map((child) => (
                <MenuItem
                  key={child.id}
                  item={child}
                  depth={depth + 1}
                  isCollapsed={isCollapsed}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

// Main Sidebar Component
export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { 
    toggleItemExpansion, 
    isItemExpanded, 
    isItemActive,
    filteredMenu
  } = useMenuState(SIDEBAR_MENU);

  return (
    <div 
      className={cn(
        "flex flex-col h-screen border-r border-border bg-card",
        isCollapsed ? "w-[60px]" : "w-[280px]",
        "transition-all duration-300"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && <h1 className="text-lg font-semibold">GKJ</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-accent/50"
        >
          {isCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        {filteredMenu.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            onToggle={toggleItemExpansion}
            isExpanded={isItemExpanded(item.id)}
            isActive={isItemActive(item.href)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Link
            to="/help"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-accent/50",
              !isCollapsed && "justify-start w-full",
              isCollapsed && "justify-center"
            )}
          >
            <HelpCircle className="w-5 h-5" />
            {!isCollapsed && <span>Bantuan</span>}
          </Link>
          <Link
            to="/auth/logout"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-accent/50",
              !isCollapsed && "justify-start w-full",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Keluar</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};
