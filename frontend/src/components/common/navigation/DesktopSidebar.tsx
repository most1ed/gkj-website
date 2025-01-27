import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { NavigationItem } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DesktopSidebarProps {
  items: NavigationItem[];
  collapsed?: boolean;
}

export function DesktopSidebar({ items, collapsed = false }: DesktopSidebarProps) {
  const location = useLocation();

  const isActive = (href: string) => 
    href === '/' 
      ? location.pathname === href 
      : location.pathname.startsWith(href);

  const renderMenuItem = (item: NavigationItem) => {
    const isItemActive = item.href ? isActive(item.href) : false;
    const hasChildren = item.items && item.items.length > 0;
    const Icon = item.icon;

    const menuItemContent = (
      <div 
        className={cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-150",
          isItemActive ? "bg-accent/50" : "hover:bg-accent/30",
          collapsed ? "justify-center w-10 mx-auto" : "w-full"
        )}
      >
        <div className={cn(
          "flex h-5 w-5 items-center justify-center",
          isItemActive 
            ? "text-primary" 
            : "text-muted-foreground group-hover:text-foreground"
        )}>
          <Icon className="h-[18px] w-[18px]" />
        </div>
        
        {!collapsed && (
          <div className="flex justify-between items-center w-full">
            <span className={cn(
              "text-sm font-medium truncate flex-1",
              isItemActive 
                ? "text-primary" 
                : "text-muted-foreground group-hover:text-foreground"
            )}>
              {item.title}
            </span>
            {hasChildren && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        )}
      </div>
    );

    // No children or simple link
    if (!hasChildren || collapsed) {
      const linkContent = item.href ? (
        <Link to={item.href}>{menuItemContent}</Link>
      ) : (
        <div>{menuItemContent}</div>
      );

      return collapsed ? (
        <TooltipProvider key={item.title}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center">{linkContent}</div>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        linkContent
      );
    }

    // With children and not collapsed
    return (
      <div key={item.title}>
        <div>{menuItemContent}</div>
        {!collapsed && (
          <div className="ml-4 space-y-1 mt-1">
            {item.items?.map((subItem) => (
              <Link
                key={subItem.href}
                to={subItem.href || '#'}
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
        )}
      </div>
    );
  };

  return (
    <nav 
      className={cn(
        "flex flex-col h-full w-full",
        collapsed ? "items-center" : "items-stretch"
      )}
    >
      <div className="space-y-1 p-2">
        {items.map(item => renderMenuItem(item))}
      </div>
    </nav>
  );
}
