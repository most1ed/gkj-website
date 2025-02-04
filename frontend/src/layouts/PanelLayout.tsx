import React, { useState, Suspense, useTransition, useCallback, useEffect } from 'react';
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

// Custom hook for responsive sidebar
const useResponsiveSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      const mobileBreakpoint = 768; // Tailwind's md breakpoint
      const currentIsMobile = window.innerWidth < mobileBreakpoint;
      
      setIsMobile(currentIsMobile);
      
      // Automatically collapse sidebar in mobile view
      if (currentIsMobile) {
        setIsCollapsed(true);
        setIsMobileSidebarOpen(false);
      }
    };

    // Check initial mobile state
    checkMobileView();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobileView);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  const toggleCollapse = useCallback(() => {
    // Only allow manual toggle if not in mobile view
    if (!isMobile) {
      setIsCollapsed(prev => !prev);
    }
  }, [isMobile]);

  const toggleMobileSidebar = useCallback(() => {
    if (isMobile) {
      setIsMobileSidebarOpen(prev => !prev);
    }
  }, [isMobile]);

  return { 
    isCollapsed, 
    isMobile, 
    isMobileSidebarOpen,
    toggleCollapse,
    toggleMobileSidebar
  };
};

// Sidebar configuration
const sidebarItems = [
  // Dashboard & User Features
  {
    label: 'Dashboard',
    icon: LayoutDashboardIcon,
    path: '/panel/flexdash',
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
    path: '/panel/management/jemaat',
  },
  {
    label: 'Ibadah',
    icon: BookIcon,
    path: '/panel/management/ibadah',
  },
  {
    label: 'Pelayanan',
    icon: HomeIcon,
    path: '/panel/management/pelayanan',
  },
  {
    label: 'Keuangan',
    icon: DollarSignIcon,
    path: '/panel/management/keuangan',
  },
  {
    label: 'Sumber Daya',
    icon: DatabaseIcon,
    path: '/panel/management/sda',
  },
  {
    label: 'Rencana Kerja',
    icon: KanbanIcon,
    path: '/panel/management/rencana',
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
  // Use the responsive sidebar hook
  const { 
    isCollapsed, 
    isMobile, 
    isMobileSidebarOpen,
    toggleCollapse,
    toggleMobileSidebar 
  } = useResponsiveSidebar();

  // Use useCallback to memoize functions
  const location = useLocation();

  // Safely initialize openMenus with a function that returns an object
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>(() => {
    const currentPath = location.pathname;
    const initialState: {[key: string]: boolean} = {};

    // Define menu groups with their base paths
    const menuGroups = [
      '/panel/management',
      '/panel/admin'
    ];

    // Open menu groups based on current path
    menuGroups.forEach(group => {
      if (currentPath.startsWith(group)) {
        initialState[group] = true;
      }
    });

    return initialState;
  });

  // Memoized menu toggle function
  const toggleMenu = useCallback((path: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  }, []);

  // Memoized sidebar item rendering
  const renderSidebarItem = useCallback((item: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
    children?: { label: string; path: string }[];
  }) => {
    const Icon = item.icon;
    const isActive = location.pathname.startsWith(item.path);

    // Render with tooltip when collapsed or in mobile view
    if (isCollapsed || isMobile) {
      return (
        <Tooltip key={item.path}>
          <TooltipTrigger asChild>
            <NavLink
              to={item.path}
              className={cn(
                "flex items-center justify-center p-2 rounded-md transition-colors duration-200",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    // Regular rendering when expanded
    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={cn(
          "flex items-center gap-3 p-2 rounded-md transition-colors duration-200",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="text-sm">{item.label}</span>
      </NavLink>
    );
  }, [location.pathname, isCollapsed, isMobile]);

  return (
    <TooltipProvider>
      <div className={cn(
        "flex h-screen w-full overflow-hidden",
        "bg-background text-foreground"
      )}>
        <div 
          className={cn(
            'bg-background border-r transition-all duration-300 ease-in-out fixed md:static z-50 h-full',
            isCollapsed ? 'w-16' : 'w-64',
            isMobile && isCollapsed ? 'hidden' : 'block'
          )}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!isCollapsed && (
              <Link 
                to="/panel/flexdash" 
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <LayoutIcon className="h-6 w-6" />
                <span>GKJ Panel</span>
              </Link>
            )}
            {!isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleCollapse}
              >
                {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </Button>
            )}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileSidebar}
              >
                {isMobileSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </Button>
            )}
          </div>

          {/* Sidebar Navigation */}
          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            {sidebarItems.map(renderSidebarItem)}
          </div>
        </div>

        <div className={cn(
          "flex flex-col w-full transition-all duration-300 ease-in-out",
          isMobile 
            ? "ml-0" 
            : isCollapsed 
              ? "ml-16" 
              : "ml-64"
        )}>
          <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4">
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMobileSidebar}
                  className="mr-2"
                >
                  <LayoutIcon className="h-5 w-5" />
                </Button>
              )}
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
        {isMobile && isMobileSidebarOpen && (
          <div 
            className="fixed top-0 left-0 z-50 h-screen w-full bg-background p-4"
          >
            <div className="flex items-center justify-between">
              <Link 
                to="/panel/flexdash" 
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <LayoutIcon className="h-6 w-6" />
                <span>GKJ Panel</span>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileSidebar}
              >
                <ChevronLeftIcon />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {sidebarItems.map(renderSidebarItem)}
            </div>
          </div>
        )}
        <Toaster />
      </div>
    </TooltipProvider>
  );
};
