import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight, LogOut, Menu, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Sidebar } from '@/components/navigation/Sidebar';
import { userNavigation } from '@/config/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="sticky top-4 z-40 mx-4 flex h-14 items-center gap-4 rounded-xl bg-card px-4 shadow-lg lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        <img className="h-6 w-auto" src="/logo.png" alt="GKJ" />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      <div className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )} onClick={() => setSidebarOpen(false)} />

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed top-20 left-4 bottom-24 z-50 w-64 rounded-xl bg-card shadow-lg transition-transform duration-300 lg:hidden",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar
          items={userNavigation}
          collapsed={false}
        />
      </div>

      {/* Desktop header */}
      <div className="fixed top-4 right-4 left-4 z-40 hidden h-14 items-center rounded-xl bg-card px-4 shadow-lg lg:flex">
        <img className="h-6 w-auto" src="/logo.png" alt="GKJ" />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <div className="flex items-center gap-3 border-l pl-3 ml-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.username}</p>
              <p className="text-xs text-muted-foreground capitalize truncate">{user?.role}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              className="h-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:fixed lg:top-24 lg:bottom-24 lg:left-4 lg:flex lg:w-64 lg:flex-col lg:rounded-xl lg:bg-card lg:shadow-lg lg:transition-all lg:duration-300",
        sidebarCollapsed && "lg:w-16"
      )}>
        <div className="flex items-center justify-end p-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-accent"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Sidebar
          items={userNavigation}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* Main content */}
      <div className={cn(
        "pt-24 pb-24 lg:pl-72 transition-all duration-300",
        sidebarCollapsed && "lg:pl-24"
      )}>
        <main className="px-4">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 right-4 left-4 z-40 flex h-14 items-center justify-between rounded-xl bg-card px-4 shadow-lg">
        <div className="text-sm text-muted-foreground">
          2025 GKJ. All rights reserved.
        </div>
        <div className="text-sm text-muted-foreground">
          Version 1.0.0
        </div>
      </footer>
    </div>
  );
}
