import React, { useState, useCallback, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Bell 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ThemeProvider } from '@/components/common/theme/ThemeProvider';
import { Sidebar } from '@/components/common/navigation/Sidebar';
import { Footer } from '@/components/common/Footer';
import { Toaster } from '@/components/ui/toaster';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function DashboardLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  }, []);

  const notifications = [
    { id: 1, title: 'Jadwal Ibadah Updated', time: '5m ago' },
    { id: 2, title: 'New Member Registration', time: '1h ago' },
  ];

  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area with Scrollable Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
            <header className="bg-white dark:bg-gray-900 border-b p-4">
              <div className="flex justify-between items-center">
                <Breadcrumb />
                
                <div className="flex items-center space-x-4">
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
                    <DropdownMenuContent align="end" className="w-80">
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
                </div>
              </div>
            </header>

            <div className="container mx-auto px-4 py-6">
              <Suspense fallback={<LoadingSpinner />}>
                <Outlet />
              </Suspense>
            </div>
          </main>

          {/* Footer - Always at the bottom */}
          <Footer />
        </div>

        {/* Global Toaster for Notifications */}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
