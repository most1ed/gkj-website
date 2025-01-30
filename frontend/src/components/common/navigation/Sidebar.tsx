import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Settings, 
  FileText, 
  BookOpen, 
  DollarSign,
  ChevronsLeft,
  ChevronsRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  icon: React.ComponentType;
  path: string;
}

const navItems: NavItem[] = [
  { 
    label: 'Dashboard', 
    icon: Home, 
    path: '/panel' 
  },
  { 
    label: 'Profil', 
    icon: User, 
    path: '/panel/profile' 
  },
  { 
    label: 'Administrasi', 
    icon: FileText, 
    path: '/panel/administrasi' 
  },
  { 
    label: 'Alkitab', 
    icon: BookOpen, 
    path: '/panel/alkitab' 
  },
  { 
    label: 'Keuangan', 
    icon: DollarSign, 
    path: '/panel/keuangan' 
  },
  { 
    label: 'Pengaturan', 
    icon: Settings, 
    path: '/panel/pengaturan' 
  }
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <TooltipProvider>
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-gray-100 dark:bg-gray-800 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className={cn(
            "flex items-center p-4 border-b",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            {!isCollapsed && (
              <h2 className="text-xl font-bold">GKJ Panel</h2>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
            >
              {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto">
            <div className="space-y-1 p-2">
              {navItems.map((item) => (
                <Tooltip key={item.path} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center p-2 rounded-lg group transition-colors duration-200",
                        location.pathname === item.path 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        isCollapsed ? "justify-center" : ""
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && (
                        <span className="ml-3 truncate">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </TooltipProvider>
import React from 'react';

export const Sidebar: React.FC = () => {
  return null;
};

export default Sidebar;
