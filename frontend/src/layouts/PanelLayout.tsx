import React, { useState } from 'react';
import { 
  Outlet, 
  useLocation, 
  Link, 
  NavLink 
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon,
  ChevronLeftIcon, 
  ChevronRightIcon, 
  DocumentIcon, 
  CogIcon, 
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChurchIcon,
  BanknotesIcon,
  HandRaisedIcon,
  BookOpenIcon,
  NewspaperIcon,
  DocumentTextIcon,
  PhotoIcon,
  AdjustmentsHorizontalIcon,
  LanguageIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  BellIcon
} from '@heroicons/react/24/outline';

import { ThemeToggle } from '@/components/common/theme/ThemeToggle';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PanelFooter } from '@/components/common/PanelFooter';
import { cn } from '@/lib/utils';

// Type definitions
type SidebarItem = {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
};

// Sidebar configuration
const sidebarItems: SidebarItem[] = [
  { 
    path: '/panel/dashboard', 
    label: 'Dashboard', 
    icon: HomeIcon 
  },
  { 
    path: '/panel/admin', 
    label: 'Admin', 
    icon: CogIcon
  },
  { 
    path: '/panel/management', 
    label: 'Manajemen', 
    icon: UserIcon
  },
  { 
    path: '/panel/base', 
    label: 'Base', 
    icon: DocumentIcon
  },
  { 
    path: '/panel/documents', 
    label: 'Dokumen', 
    icon: DocumentIcon
  }
];

// Breadcrumbs Component
const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Link 
        to="/" 
        className="text-muted-foreground hover:text-primary"
      >
        <HomeIcon className="h-4 w-4" />
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <React.Fragment key={name}>
            <span className="text-muted-foreground">/</span>
            <Link
              to={routeTo}
              className={cn(
                isLast 
                  ? 'text-primary font-semibold' 
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Notification Dropdown Component
const NotificationDropdown: React.FC = () => {
  const notifications = [
    { id: 1, message: 'New event scheduled', time: '2m ago' },
    { id: 2, message: 'Document uploaded', time: '10m ago' },
    { id: 3, message: 'Membership renewal', time: '1h ago' }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px]"
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map(notification => (
          <DropdownMenuItem 
            key={notification.id} 
            className="flex justify-between items-center"
          >
            <span className="text-xs">{notification.message}</span>
            <span className="text-[10px] text-muted-foreground">
              {notification.time}
            </span>
          </DropdownMenuItem>
        ))}
        {notifications.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-4">
            No new notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Language Selector Component
const LanguageSelector: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'jv', name: 'Basa Jawa' }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LanguageIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map(lang => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => setCurrentLanguage(lang.code)}
            className={cn(
              'cursor-pointer',
              currentLanguage === lang.code 
                ? 'bg-accent text-accent-foreground' 
                : ''
            )}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Sidebar Navigation Component
const SidebarNavigation: React.FC<{
  isCollapsed: boolean;
  items: SidebarItem[];
  openMenus: { [key: string]: boolean };
  toggleMenu: (path: string) => void;
}> = ({ isCollapsed, items, openMenus, toggleMenu }) => {
  return (
    <nav className="flex-1 px-2 py-4 space-y-1">
      {items.map((item) => (
        <div key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) => cn(
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200',
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              isCollapsed ? 'justify-center' : 'justify-start'
            )}
          >
            <item.icon 
              className={cn(
                'h-5 w-5 mr-3 transition-transform duration-200',
                isCollapsed ? 'mr-0' : 'mr-3'
              )} 
            />
            {!isCollapsed && <span>{item.label}</span>}
            {!isCollapsed && item.children && (
              <ChevronDownIcon 
                className={cn(
                  'ml-auto h-4 w-4 transform transition-transform duration-200',
                  openMenus[item.path] ? 'rotate-180' : ''
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleMenu(item.path);
                }}
              />
            )}
          </NavLink>
          {!isCollapsed && item.children && openMenus[item.path] && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  className={({ isActive }) => cn(
                    'group flex items-center px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200',
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

// Main Panel Layout Component
export const PanelLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({});

  const toggleMenu = (path: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div 
        className={cn(
          'bg-background border-r transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-16' : 'w-64',
          'flex flex-col h-full relative overflow-hidden'
        )}
      >
        {/* Sidebar Header */}
        <div className="p-2 flex items-center justify-between">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg"
            >
              GKJ Panel
            </motion.div>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSidebar}
                >
                  {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto">
          <SidebarNavigation 
            isCollapsed={isCollapsed}
            items={sidebarItems}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b px-4 py-2 flex items-center justify-between">
          <Breadcrumbs />
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <NotificationDropdown />
            <LanguageSelector />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 flex flex-col">
          <div className="flex-grow">
            <Outlet />
          </div>
          
          {/* Panel Footer */}
          <PanelFooter className="mt-4 border-t pt-2" />
        </main>
      </div>
    </div>
  );
};
