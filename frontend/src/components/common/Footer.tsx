import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'public' | 'panel';
  socialLinks?: Array<{
    name: string;
    href: string;
    icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
  }>;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
  informationLinks?: Array<{
    name: string;
    href: string;
  }>;
  companyName?: string;
  description?: string;
  address?: {
    street: string[];
    phone?: string;
    email?: string;
    website?: string;
  };
}

const defaultSocialLinks = [
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
];

const defaultLegalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms & Conditions', href: '/terms' },
];

export const Footer: React.FC<FooterProps> = ({
  variant = 'panel',
  className,
  socialLinks = defaultSocialLinks,
  legalLinks = defaultLegalLinks,
  informationLinks = [],
  companyName = 'Gereja Kristen Jawa',
  description = 'Melayani dengan kasih, bertumbuh dalam iman, dan menjadi berkat bagi sesama.',
  address,
  ...props
}) => {
  const currentYear = new Date().getFullYear();

  if (variant === 'panel') {
    return (
      <footer 
        className={cn(
          'text-xs text-muted-foreground text-center py-2',
          className
        )}
        {...props}
      >
        <div className="flex justify-center space-x-4">
          {legalLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="mt-2">
          {currentYear} {companyName}. All rights reserved.
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn('bg-background border-t', className)} {...props}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{companyName}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon && item.icon({ className: 'h-5 w-5', 'aria-hidden': 'true' })}
                </a>
              ))}
            </div>
          </div>

          {/* Sinode GKJ */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sinode GKJ</h3>
            <ul className="space-y-2">
              {[
                { name: 'Berita Sinode', href: 'https://sinodegkj.or.id/berita/' },
                { name: 'Kotbah Jangkep', href: 'https://sinodegkj.or.id/materi/kotbah/' },
                { name: 'Kurikulum', href: 'https://sinodegkj.or.id/materi/renungan-harian/' },
                { name: 'Renungan Harian', href: 'https://sinodegkj.or.id/materi/renungan-harian/' },
                { name: 'Perpustakaan', href: 'https://perpustakaan.sinodegkj.or.id/' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informasi</h3>
            <ul className="space-y-2">
              {informationLinks.length > 0 ? informationLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              )) : [
                { name: 'Warta Jemaat', href: '/warta-jemaat' },
                { name: 'Arsip Warta', href: '/arsip-warta' },
                { name: 'Jadwal Kegiatan', href: '/jadwal-kegiatan' },
                { name: 'Persembahan', href: '/persembahan' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontak</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              {address ? (
                <>
                  {address.street.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                  {address.phone && <p>{address.phone}</p>}
                  {address.email && (
                    <p>
                      <a 
                        href={`mailto:${address.email}`} 
                        className="hover:text-primary"
                      >
                        {address.email}
                      </a>
                    </p>
                  )}
                  {address.website && (
                    <p>
                      <a 
                        href={address.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-primary"
                      >
                        {address.website}
                      </a>
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p>
                    Kompleks Rasa Sayang<br />
                    Blok HH No. 1,<br />
                    Wijaya Kusuma, Grogol,<br />
                    Jakarta Barat 11460
                  </p>
                  <p>(021) 5659044</p>
                  <p>
                    <a href="mailto:gkjgrogol@yahoo.com" className="hover:text-primary">
                      gkjgrogol@yahoo.com
                    </a>
                  </p>
                  <p>
                    <a href="http://www.gkjgrogoljakarta.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      www.gkjgrogoljakarta.org
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {legalLinks.map((item) => (
                <Link key={item.name} to={item.href} className="hover:text-primary">
                  {item.name}
                </Link>
              ))}
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {currentYear} {companyName}. Semua Hak Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
