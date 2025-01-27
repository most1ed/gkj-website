import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/config/navigation';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  items: NavigationItem[];
  isMobile?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
}

export function Sidebar({ 
  items, 
  isMobile = false, 
  isCollapsed = false,
  onClose 
}: SidebarProps) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === href;
    return location.pathname.startsWith(href);
  };

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

    // Base menu item content
    const menuItemContent = (
      <div 
        className={cn(
          "group flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all duration-150",
          isItemActive ? "bg-accent/50" : "hover:bg-accent/30",
          isMobile ? "w-full" : (isCollapsed ? "justify-center w-10 mx-auto" : "w-full")
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-5 w-5 items-center justify-center",
            isItemActive 
              ? "text-primary" 
              : "text-muted-foreground group-hover:text-foreground"
          )}>
            <Icon className="h-[18px] w-[18px]" />
          </div>
          
          {!isCollapsed && (
            <span className={cn(
              "text-sm font-medium truncate",
              isItemActive 
                ? "text-primary" 
                : "text-muted-foreground group-hover:text-foreground"
            )}>
              {item.title}
            </span>
          )}
        </div>

        {hasChildren && !isCollapsed && (
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform", 
              isMenuOpen ? "rotate-180" : ""
            )} 
          />
        )}
      </div>
    );

    // Render logic based on mobile or desktop
    if (!hasChildren) {
      const linkContent = item.href ? (
        <Link 
          to={item.href} 
          onClick={isMobile ? onClose : undefined}
        >
          {menuItemContent}
        </Link>
      ) : (
        <div>{menuItemContent}</div>
      );

      return linkContent;
    }

    // Items with children
    return (
      <div>
        <div 
          onClick={() => {
            if (isMobile || !isCollapsed) toggleMenu(item.title);
          }}
          className="cursor-pointer"
        >
          {menuItemContent}
        </div>

        {/* Submenu rendering */}
        {!isCollapsed && (
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className={`ml-${depth * 4} space-y-1 mt-1`}>
                  {item.items?.map((subItem) => (
                    <Link
                      key={subItem.href}
                      to={subItem.href}
                      onClick={isMobile ? onClose : undefined}
                      className={cn(
                        "flex h-9 items-center gap-2 rounded-lg px-3 text-sm transition-all duration-150 hover:bg-accent/30 group",
                        isActive(subItem.href) && "bg-accent/50"
                      )}
                    >
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isActive(subItem.href) 
                          ? "bg-primary" 
                          : "bg-muted-foreground group-hover:bg-foreground"
                      )} />
                      <span className={cn(
                        "font-medium truncate",
                        isActive(subItem.href) 
                          ? "text-primary" 
                          : "text-muted-foreground group-hover:text-foreground"
                      )}>
                        {subItem.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <nav className={cn(
      "flex flex-col h-full w-full",
      isMobile ? "p-2" : (isCollapsed ? "items-center" : "items-stretch")
    )}>
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="space-y-1">
          {items.map((item, index) => (
            <div key={index}>
              {renderMenuItem(item)}
            </div>
          ))}
        </div>
      </ScrollArea>
    </nav>
  );
}
