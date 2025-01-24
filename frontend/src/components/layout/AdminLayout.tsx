import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CogIcon,
  ChartBarIcon,
  NewspaperIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  {
    name: 'Master Data',
    href: '/admin/master',
    icon: UsersIcon,
    children: [
      { name: 'Data Jemaat', href: '/admin/master/members' },
      { name: 'Data Keluarga', href: '/admin/master/families' },
      { name: 'Data Pelayanan', href: '/admin/master/services' },
      { name: 'Kategori', href: '/admin/master/categories' },
    ],
  },
  {
    name: 'Keuangan',
    href: '/admin/finance',
    icon: CurrencyDollarIcon,
    children: [
      { name: 'Transaksi', href: '/admin/finance/transactions' },
      { name: 'Kategori', href: '/admin/finance/categories' },
      { name: 'Laporan', href: '/admin/finance/reports' },
      { name: 'Aset', href: '/admin/finance/assets' },
    ],
  },
  {
    name: 'Konten',
    href: '/admin/content',
    icon: NewspaperIcon,
    children: [
      { name: 'Warta', href: '/admin/content/news' },
      { name: 'Pengumuman', href: '/admin/content/announcements' },
      { name: 'Galeri', href: '/admin/content/gallery' },
      { name: 'Artikel', href: '/admin/content/articles' },
    ],
  },
  {
    name: 'System',
    href: '/admin/system',
    icon: CogIcon,
    children: [
      { name: 'Users', href: '/admin/system/users' },
      { name: 'Roles', href: '/admin/system/roles' },
      { name: 'Settings', href: '/admin/system/settings' },
      { name: 'Backup', href: '/admin/system/backup' },
    ],
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const location = useLocation();
  const { user } = useAuth();

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isMenuOpen = (menuName: string) => openMenus.includes(menuName);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <img className="h-8 w-auto" src="/logo.png" alt="GKJ" />
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => item.children && toggleMenu(item.name)}
                    className={`${
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        isActive(item.href)
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                    {item.children && (
                      <svg
                        className={`${
                          isMenuOpen(item.name) ? 'transform rotate-180' : ''
                        } ml-auto h-5 w-5 transition-transform`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  {item.children && isMenuOpen(item.name) && (
                    <div className="mt-1 space-y-1">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={`${
                            isActive(subItem.href)
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          } group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-md`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <UserCircleIcon className="inline-block h-9 w-9 rounded-full text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
