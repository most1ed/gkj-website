import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Calendar, 
  Users, 
  BookOpen, 
  DollarSign, 
  Settings 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/panel/dashboard',
  },
  {
    label: 'Profil',
    icon: User,
    href: '/panel/profile',
  },
  {
    label: 'Dokumen',
    icon: FileText,
    href: '/panel/documents',
  },
  {
    label: 'Jadwal',
    icon: Calendar,
    href: '/panel/events',
  },
  {
    label: 'Jemaat',
    icon: Users,
    href: '/panel/jemaat',
  },
  {
    label: 'Ibadah',
    icon: BookOpen,
    href: '/panel/ibadah',
  },
  {
    label: 'Pelayanan',
    icon: BookOpen,
    href: '/panel/pelayanan',
  },
  {
    label: 'Keuangan',
    icon: DollarSign,
    href: '/panel/keuangan',
  },
  {
    label: 'Admin',
    icon: Settings,
    children: [
      { 
        label: 'Dashboard', 
        href: '/panel/admin/dashboard' 
      },
      { 
        label: 'Konten', 
        href: '/panel/admin/konten' 
      },
      { 
        label: 'Pengaturan', 
        href: '/panel/admin/pengaturan' 
      },
      { 
        label: 'Artikel', 
        href: '/panel/admin/artikel' 
      },
      { 
        label: 'Master', 
        href: '/panel/admin/master' 
      },
      { 
        label: 'Alkitab', 
        href: '/panel/admin/alkitab' 
      },
      { 
        label: 'Media', 
        href: '/panel/admin/media' 
      }
    ]
  }
];

export function Sidebar() {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = React.useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const renderMenuItem = (item: any, depth = 0) => {
    const isActive = location.pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.label}>
        <Link 
          to={item.href || '#'}
          className={cn(
            'flex items-center px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700',
            isActive ? 'bg-gray-200 dark:bg-gray-800 font-semibold' : '',
            depth > 0 ? 'pl-8' : ''
          )}
          onClick={() => hasChildren && toggleMenu(item.label)}
        >
          {item.icon && <item.icon className="mr-3 h-5 w-5" />}
          {item.label}
          {hasChildren && (
            <span className="ml-auto">
              {expandedMenus[item.label] ? '▼' : '►'}
            </span>
          )}
        </Link>
        
        {hasChildren && expandedMenus[item.label] && (
          <div className="pl-4">
            {item.children.map((child: any) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-bold">GKJ Panel</h2>
      </div>
      <nav className="py-4">
        {menuItems.map(renderMenuItem)}
      </nav>
    </div>
  );
}
