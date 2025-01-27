import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { NavigationItem } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileSidebarProps {
  items: NavigationItem[];
  onClose: () => void;
}

export function MobileSidebar({ items, onClose }: MobileSidebarProps) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const isActive = (href: string) => 
    href === '/' 
      ? location.pathname === href 
      : location.pathname.startsWith(href);

  const toggleMenu = (title: string) => {
    setOpenMenus(current => 
      current.includes(title)
        ? current.filter(t => t !== title)
        : [...current, title]
    );
  };

  const renderMenuItem = (item: NavigationItem, depth = 0) => {
    const isItemActive = item.href ? isActive(item.href) : false;
    const hasChildren = item.items && item.items.length > 0;
    const isMenuOpen = openMenus.includes(item.title);
    const Icon = item.icon;

    const menuItemContent = (
      <div 
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 hover:bg-accent/30 transition-colors",
          isItemActive ? "bg-accent/50" : ""
        )}
      >
        <div className="flex items-center gap-4">
          <Icon className={cn(
            "h-5 w-5", 
            isItemActive ? "text-primary" : "text-muted-foreground"
          )} />
          <span className={cn(
            "text-sm font-medium",
            isItemActive ? "text-primary" : "text-foreground"
          )}>
            {item.title}
          </span>
        </div>

        {hasChildren && (
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform", 
              isMenuOpen ? "rotate-180" : ""
            )} 
          />
        )}
      </div>
    );

    // No children or simple link
    if (!hasChildren) {
      return (
        <Link 
          key={item.title}
          to={item.href || '#'}
          onClick={onClose}
          className="block"
        >
          {menuItemContent}
        </Link>
      );
    }

    // With children
    return (
      <div key={item.title}>
        <div 
          onClick={() => toggleMenu(item.title)}
          className="cursor-pointer"
        >
          {menuItemContent}
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {item.items?.map((subItem) => (
                <Link
                  key={subItem.href}
                  to={subItem.href || '#'}
                  onClick={onClose}
                  className={cn(
                    "block pl-12 py-2 text-sm hover:bg-accent/30 transition-colors",
                    isActive(subItem.href) ? "bg-accent/50 text-primary" : "text-muted-foreground"
                  )}
                >
                  {subItem.title}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="py-4">
        {items.map(item => renderMenuItem(item))}
      </div>
    </div>
  );
}
