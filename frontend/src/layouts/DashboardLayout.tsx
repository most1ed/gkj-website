import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  Church,
  HeartHandshake,
  Music,
  GraduationCap,
  DollarSign,
  FileText,
  Settings,
  Bell,
  Menu,
  X,
  MessageCircle,
  UserPlus,
  Boxes,
  Building2,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FloatingSidebar } from '@/components/common/navigation/FloatingSidebar';
import { Sheet } from '@/components/ui/Sheet';
import { NavigationItem } from '@/config/navigation';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Jemaat',
    icon: Users,
    items: [
      { title: 'Data Jemaat', href: '/dashboard/jemaat/data', icon: Users },
      { title: 'Pendaftaran', href: '/dashboard/jemaat/register', icon: UserPlus },
      { title: 'Kelompok Wilayah', href: '/dashboard/jemaat/wilayah', icon: Building2 }
    ]
  },
  {
    title: 'Ibadah',
    icon: Church,
    items: [
      { title: 'Jadwal Ibadah', href: '/dashboard/ibadah/jadwal', icon: Calendar },
      { title: 'Liturgi', href: '/dashboard/ibadah/liturgi', icon: BookOpen },
      { title: 'Pelayanan', href: '/dashboard/ibadah/pelayanan', icon: HeartHandshake },
      { title: 'Musik', href: '/dashboard/ibadah/musik', icon: Music }
    ]
  },
  {
    title: 'Pembinaan',
    icon: GraduationCap,
    items: [
      { title: 'Sekolah Minggu', href: '/dashboard/pembinaan/sekolah-minggu', icon: GraduationCap },
      { title: 'Katekisasi', href: '/dashboard/pembinaan/katekisasi', icon: BookOpen },
      { title: 'Pemuda', href: '/dashboard/pembinaan/pemuda', icon: Users }
    ]
  },
  {
    title: 'Keuangan',
    icon: DollarSign,
    items: [
      { title: 'Persembahan', href: '/dashboard/keuangan/persembahan', icon: DollarSign },
      { title: 'Pengeluaran', href: '/dashboard/keuangan/pengeluaran', icon: DollarSign },
      { title: 'Laporan', href: '/dashboard/keuangan/laporan', icon: FileText }
    ]
  },
  {
    title: 'Inventaris',
    href: '/dashboard/inventaris',
    icon: Boxes
  },
  {
    title: 'Komunikasi',
    icon: MessageCircle,
    items: [
      { title: 'Pengumuman', href: '/dashboard/komunikasi/pengumuman', icon: Bell },
      { title: 'Warta Jemaat', href: '/dashboard/komunikasi/warta', icon: FileText }
    ]
  },
  {
    title: 'Pengaturan',
    href: '/dashboard/settings',
    icon: Settings
  }
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Handle theme toggle
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
  };

  // Get current user (mock data for now)
  const currentUser = {
    name: 'John Doe',
    role: 'Admin',
    image: '/avatar.png'
  };

  // Get notifications (mock data)
  const notifications = [
    { id: 1, title: 'Jadwal Ibadah Updated', time: '5m ago' },
    { id: 2, title: 'New Member Registration', time: '1h ago' },
  ];

  return (
    <div className="relative min-h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <FloatingSidebar 
        items={navigationItems} 
        isMobile={sidebarOpen}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Top Navigation Bar */}
      <header className="fixed top-0 right-0 left-0 lg:left-[calc(4rem+1rem)] z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-16 items-center px-4 sm:px-6 justify-between">
          <Breadcrumb />

          <div className="flex items-center gap-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs"
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 z-50">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id}>
                    {notification.title}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  <div className="h-8 w-8 rounded-full bg-muted">
                    {/* User Avatar */}
                  </div>
                  <div className="hidden lg:block">
                    <div className="text-sm font-medium">{currentUser.name}</div>
                    <div className="text-xs text-muted-foreground">{currentUser.role}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-50">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-[calc(4rem+2rem)] pt-16 p-4 md:p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
