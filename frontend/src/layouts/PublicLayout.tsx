import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from '@/components/common/Footer';

const navigation = {
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
  ],
  legalLinks: [
    { name: 'Kebijakan Privasi', href: '/privacy-policy' },
    { name: 'Syarat & Ketentuan', href: '/terms' },
    { name: 'Peta Situs', href: '/sitemap' },
    { name: 'Pernyataan Misi', href: '/mission-statement' },
    { name: 'Struktur Organisasi', href: '/organizational-structure' },
    { name: 'Laporan Keuangan', href: '/financial-reports' },
    { name: 'Kebijakan Keamanan', href: '/security-policy' },
  ],
  informationLinks: [
    { name: 'Warta Jemaat', href: '/warta-jemaat' },
    { name: 'Arsip Warta', href: '/arsip-warta' },
    { name: 'Jadwal Kegiatan', href: '/jadwal-kegiatan' },
    { name: 'Persembahan', href: '/persembahan' },
  ],
  address: {
    street: [
      'Kompleks Rasa Sayang',
      'Blok HH No. 1,',
      'Wijaya Kusuma, Grogol,',
      'Jakarta Barat 11460'
    ],
    phone: '(021) 5659044',
    email: 'gkjgrogol@yahoo.com',
    website: 'http://www.gkjgrogoljakarta.org'
  }
};

export function PublicLayout() {
  const location = useLocation();
  
  return (
    <div className="layout-min-height bg-background text-foreground">
      <Navbar />
      <main className="layout-flex-grow pt-20">
        {/* Add key to force re-render on route change */}
        <div key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <Footer 
        variant="public" 
        socialLinks={navigation.social}
        legalLinks={navigation.legalLinks}
        informationLinks={navigation.informationLinks}
        description="Melayani dengan kasih, bertumbuh dalam iman, dan menjadi berkat bagi sesama."
        address={navigation.address}
      />
    </div>
  );
}
