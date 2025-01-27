import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { NavigationItem } from '@/config/navigation';

interface SidebarProps {
  items: NavigationItem[];
  header?: ReactNode;
  footer?: ReactNode;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ 
  items, 
  header, 
  footer, 
  collapsed = false,
  onCollapse 
}: SidebarProps) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    if (collapsed) return;
    setExpanded(current =>
      current.includes(title)
        ? current.filter(t => t !== title)
        : [...current, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const NavigationItem = ({ item }: { item: NavigationItem }) => {
    const isItemActive = item.href ? isActive(item.href) : false;
    const isExpanded = expanded.includes(item.title);
    const hasSubItems = item.items && item.items.length > 0;
    const Icon = item.icon;

    if (item.href && !hasSubItems) {
      return (
        <Link
          to={item.href}
          className={cn(
            "group flex h-10 items-center gap-3 rounded-lg px-3 transition-all duration-150",
            isItemActive 
              ? "bg-accent/50" 
              : "hover:bg-accent/30",
            collapsed && "justify-center w-10 px-0 mx-auto"
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
            <span className={cn(
              "text-sm font-medium truncate flex-1",
              isItemActive 
                ? "text-primary" 
                : "text-muted-foreground group-hover:text-foreground"
            )}>
              {item.title}
            </span>
          )}
        </Link>
      );
    }

    return (
      <>
        <Button
          variant="ghost"
          className={cn(
            "group h-10 w-full justify-start gap-3 rounded-lg px-3 hover:bg-accent/30",
            collapsed && "justify-center w-10 px-0 mx-auto"
          )}
          onClick={() => toggleExpand(item.title)}
        >
          <div className={cn(
            "flex h-5 w-5 items-center justify-center",
            "text-muted-foreground group-hover:text-foreground"
          )}>
            <Icon className="h-[18px] w-[18px]" />
          </div>
          {!collapsed && (
            <>
              <span className="flex-1 text-sm font-medium truncate text-muted-foreground group-hover:text-foreground">
                {item.title}
              </span>
              {hasSubItems && (
                <motion.span
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.span>
              )}
            </>
          )}
        </Button>

        {hasSubItems && !collapsed && (
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="ml-4 space-y-1 mt-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      to={subItem.href}
                      className={cn(
                        "flex h-9 items-center gap-2 rounded-lg px-3 text-sm transition-all duration-150 hover:bg-accent/30 group",
                        isActive(subItem.href) && "bg-accent/50"
                      )}
                    >
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isActive(subItem.href) ? "bg-primary" : "bg-muted-foreground group-hover:bg-foreground"
                      )} />
                      <span className={cn(
                        "font-medium truncate",
                        isActive(subItem.href) ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
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
      </>
    );
  };

  return (
    <div className="flex h-full flex-col">
      {header}
      <ScrollArea className="flex-1 overflow-hidden px-3">
        <div className="space-y-2 py-2">
          {items.map((item) => (
            <NavigationItem key={item.title} item={item} />
          ))}
        </div>
      </ScrollArea>
      {footer}
    </div>
  );
}
