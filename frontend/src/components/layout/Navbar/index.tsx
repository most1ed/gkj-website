import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { AuthDialog } from '@/components/auth/AuthDialog';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: 'Beranda',
      href: '/',
      current: location.pathname === '/',
    },
    {
      name: 'Tentang',
      href: '/about',
      current: location.pathname === '/about',
    },
    {
      name: 'Ibadah',
      href: '/services',
      current: location.pathname === '/services',
    },
    {
      name: 'Pelayanan',
      href: '/ministries',
      current: location.pathname === '/ministries',
    },
    {
      name: 'Media',
      href: '/media',
      current: location.pathname === '/media',
    },
    {
      name: 'Persembahan',
      href: '/offerings',
      current: location.pathname === '/offerings',
    },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">GKJ Grogol Jakarta</span>
            <img
              className="h-12 w-auto"
              src="/logo.png"
              alt="GKJ Grogol Jakarta"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Buka menu utama</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-semibold leading-6 ${
                item.current ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => setAuthDialogOpen(true)}
            className="text-sm font-semibold leading-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Portal Jemaat
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">GKJ Grogol Jakarta</span>
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="GKJ Grogol Jakarta"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Tutup menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      item.current ? 'text-primary' : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthDialogOpen(true);
                  }}
                  className="w-full text-center text-base font-semibold leading-7 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Portal Jemaat
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Auth Dialog */}
      <AuthDialog open={authDialogOpen} onClose={() => setAuthDialogOpen(false)} />
    </header>
  );
}
