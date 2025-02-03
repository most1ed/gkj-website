import React, { useState, Suspense, useTransition } from 'react';
import { 
  Outlet, 
  NavLink, 
  useLocation,
  useNavigate,
  Link 
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboardIcon, 
  UserIcon, 
  FileTextIcon, 
  CalendarIcon, 
  UsersIcon, 
  BookIcon, 
  DollarSignIcon, 
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BellIcon,
  HomeIcon,
  LayoutIcon,
  NewspaperIcon,
  DatabaseIcon,
  BookOpenIcon,
  ImageIcon,
  CreditCardIcon,
  KanbanIcon
} from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/common/theme/ThemeToggle';
import { PanelFooter } from '@/components/common/PanelFooter';
import { useAuth } from '@/hooks/auth';
import { Toaster } from '@/components/ui/toaster';

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

// Profile Dropdown Component
const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex items-center space-x-2">
            <UserIcon className="h-5 w-5" />
            <span>{user?.name || 'My Account'}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Sidebar configuration
const sidebarItems = [
  // Dashboard & User Features
  {
    label: 'Dashboard',
    icon: LayoutDashboardIcon,
    path: '/panel/dashboard',
  },
  {
    label: 'Profil',
    icon: UserIcon,
    path: '/panel/profile',
  },
  {
    label: 'Dokumen',
    icon: FileTextIcon,
    path: '/panel/documents',
  },
  {
    label: 'Jadwal',
    icon: CalendarIcon,
    path: '/panel/events',
  },
  {
    label: 'Persembahan',
    icon: CreditCardIcon,
    path: '/panel/offerings',
  },

  // Management Features
  {
    label: 'Jemaat',
    icon: UsersIcon,
    path: '/panel/jemaat',
  },
  {
    label: 'Ibadah',
    icon: BookIcon,
    path: '/panel/ibadah',
  },
  {
    label: 'Pelayanan',
    icon: HomeIcon,
    path: '/panel/pelayanan',
  },
  {
    label: 'Keuangan',
    icon: DollarSignIcon,
    path: '/panel/keuangan',
  },
  {
    label: 'Sumber Daya',
    icon: DatabaseIcon,
    path: '/panel/sda',
  },
  {
    label: 'Rencana Kerja',
    icon: KanbanIcon,
    path: '/panel/rencana',
  },

  // Admin Features
  {
    label: 'Konten',
    icon: LayoutIcon,
    path: '/panel/admin/konten',
  },
  {
    label: 'Artikel',
    icon: NewspaperIcon,
    path: '/panel/admin/artikel',
  },
  {
    label: 'Master',
    icon: DatabaseIcon,
    path: '/panel/admin/master',
  },
  {
    label: 'Alkitab',
    icon: BookOpenIcon,
    path: '/panel/admin/alkitab',
  },
  {
    label: 'Media',
    icon: ImageIcon,
    path: '/panel/admin/media',
  },
  {
    label: 'Pengaturan',
    icon: SettingsIcon,
    path: '/panel/admin/pengaturan',
  }
];

export const PanelLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({});
  const location = useLocation();

  const toggleMenu = (path: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  const renderSidebarItem = (item: any, depth = 0) => {
    const isActive = location.pathname === item.path || 
      (item.children && item.children.some((child: any) => location.pathname === child.path));
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.path}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  isCollapsed ? 'justify-center' : 'justify-start'
                )}
                end
              >
                {item.icon && (
                  <item.icon 
                    className={cn(
                      'h-5 w-5',
                      isCollapsed ? 'mr-0' : 'mr-3'
                    )}
                  />
                )}
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {hasChildren && !isCollapsed && (
                  <ChevronRightIcon
                    className={cn(
                      'ml-auto h-4 w-4 transition-transform duration-200',
                      openMenus[item.path] ? 'rotate-90' : ''
                    )}
                  />
                )}
              </NavLink>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                {item.label}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {hasChildren && openMenus[item.path] && !isCollapsed && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children.map((child: any) => renderSidebarItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "flex h-screen w-full overflow-hidden",
      "bg-background text-foreground"
    )}>
      <TooltipProvider>
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
          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            {sidebarItems.map(renderSidebarItem)}
          </div>
        </div>
      </TooltipProvider>

      <div className={cn(
        "flex flex-col w-full transition-all duration-300 ease-in-out",
        isCollapsed ? "ml-16" : "ml-64"
      )}>
        <header className="sticky top-0 z-40 w-full border-b bg-background">
          <div className="flex h-16 items-center justify-between px-4">
            <Breadcrumbs />
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Outlet />
          </Suspense>
          <PanelFooter className="mt-4 border-t pt-2" />
        </main>
      </div>
      <Toaster />
    </div>
  );
};
