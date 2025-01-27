import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  DollarSign, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const navItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: '/dashboard', 
      roles: ['Administrator', 'Majelis', 'Warga Gereja'] 
    },
    { 
      icon: Users, 
      label: 'Manajemen Pengguna', 
      path: '/dashboard/users', 
      roles: ['Administrator'] 
    },
    { 
      icon: Calendar, 
      label: 'Kegiatan Gereja', 
      path: '/dashboard/activities', 
      roles: ['Administrator', 'Majelis'] 
    },
    { 
      icon: DollarSign, 
      label: 'Laporan Keuangan', 
      path: '/dashboard/finance', 
      roles: ['Administrator', 'Majelis'] 
    }
  ];

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 p-6 border-r">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold">Dashboard GKJ</h2>
          <p className="text-sm text-gray-600">{user?.username}</p>
        </div>

        <nav className="space-y-2">
          {navItems
            .filter(item => item.roles.includes(user?.role || ''))
            .map(item => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => `
                  flex items-center p-3 rounded-lg transition-colors 
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-gray-200 text-gray-700'
                  }
                `}
              >
                <item.icon className="mr-3" size={20} />
                {item.label}
              </NavLink>
            ))
          }
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2" size={20} />
            Logout
          </Button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
}
