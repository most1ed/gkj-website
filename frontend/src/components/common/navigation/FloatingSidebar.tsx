import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  ChevronsLeft, 
  ChevronsRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/config/navigation';
import { Button } from '@/components/ui/Button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface FloatingSidebarProps {
  items: NavigationItem[];
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function FloatingSidebar({ 
  items, 
  isMobile = false,
  isOpen = false,
  onClose 
}: FloatingSidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);

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
          "group flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-150",
          isItemActive 
            ? "bg-primary/10 text-primary" 
            : "hover:bg-accent/30 text-muted-foreground hover:text-foreground",
          isCollapsed ? "w-10 justify-center" : "w-full"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className={cn(
            "h-5 w-5", 
            isItemActive ? "text-primary" : "text-inherit"
          )} />
          
          {!isCollapsed && (
            <span className={cn(
              "text-sm font-medium truncate",
              isItemActive ? "text-primary" : "text-inherit"
            )}>
              {item.title}
            </span>
          )}
        </div>

        {hasChildren && !isCollapsed && (
          <ChevronRight 
            className={cn(
              "h-4 w-4 transition-transform", 
              isMenuOpen ? "rotate-90" : ""
            )} 
          />
        )}
      </div>
    );

    // No children or simple link
    if (!hasChildren) {
      const linkContent = item.href ? (
        <Link 
          to={item.href}
          className={cn(
            "block rounded-lg",
            isCollapsed ? "w-10" : "w-full"
          )}
        >
          {menuItemContent}
        </Link>
      ) : (
        <div>{menuItemContent}</div>
      );

      return isCollapsed ? (
        <TooltipProvider key={item.title}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{linkContent}</div>
            </TooltipTrigger>
            <TooltipContent side="right">
              {item.title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        linkContent
      );
    }

    // Items with children
    return (
      <div key={item.title} className="relative">
        <div 
          onClick={() => {
            if (isCollapsed) {
              // Expand sidebar if collapsed and menu has children
              setIsCollapsed(false);
            } else {
              toggleMenu(item.title);
            }
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
                className="overflow-hidden pl-4"
              >
                {item.items?.map((subItem) => (
                  <Link
                    key={subItem.href}
                    to={subItem.href || '#'}
                    className={cn(
                      "block py-2 text-sm rounded-lg transition-all duration-150",
                      isActive(subItem.href) 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-accent/30 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <div 
      className={cn(
        "fixed left-4 top-4 bottom-4 z-50 bg-card shadow-xl rounded-2xl transition-all duration-300 ease-in-out",
        isMobile 
          ? "inset-0 w-full h-full" 
          : (isCollapsed ? "w-16" : "w-72"),
        !isMobile && "hidden lg:block"
      )}
    >
      {isMobile && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-accent/30 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="relative h-full flex flex-col">
        {/* Collapse/Expand Button */}
        {!isMobile && (
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:bg-accent/30 rounded-full"
            >
              {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
            </Button>
          </div>
        )}

        {/* Logo/Brand */}
        <div 
          className={cn(
            "flex items-center justify-center py-4 border-b",
            isCollapsed ? "flex-col" : "flex-row gap-2"
          )}
        >
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-bold">G</span>
          </div>
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-primary">GKJ Panel</h2>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {items.map((item, index) => renderMenuItem(item, index))}
        </div>

        {/* Footer/User Section */}
        {!isCollapsed && !isMobile && (
          <div className="border-t p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-muted rounded-full"></div>
            <div>
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">Admin</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
