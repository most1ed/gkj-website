import React from 'react';
import { Link } from 'react-router-dom';

const navigation = {
  legal: [
    { name: 'Kebijakan Privasi', href: '/privacy-policy' },
    { name: 'Syarat & Ketentuan', href: '/terms' },
    { name: 'Peta Situs', href: '/sitemap' },
    { name: 'Pernyataan Misi', href: '/mission-statement' },
    { name: 'Struktur Organisasi', href: '/organizational-structure' },
    { name: 'Laporan Keuangan', href: '/financial-reports' },
    { name: 'Kebijakan Keamanan', href: '/security-policy' },
  ],
  informasi: [
    { name: 'Warta Jemaat', href: '/warta-jemaat' },
    { name: 'Arsip Warta', href: '/arsip-warta' },
    { name: 'Jadwal Kegiatan', href: '/jadwal-kegiatan' },
    { name: 'Persembahan', href: '/persembahan' },
  ],
  sinode: [
    { name: 'Berita Sinode', href: 'https://sinodegkj.or.id/berita/' },
    { name: 'Kotbah Jangkep', href: 'https://sinodegkj.or.id/materi/kotbah/' },
    { name: 'Kurikulum', href: 'https://sinodegkj.or.id/materi/renungan-harian/' },
    { name: 'Renungan Harian', href: 'https://sinodegkj.or.id/materi/renungan-harian/' },
    { name: 'Perpustakaan', href: 'https://perpustakaan.sinodegkj.or.id/' },
  ],
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
    {
      name: 'YouTube',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ],
};

export function PublicFrontpageFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* GKJ Grogol Jakarta */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Gereja Kristen Jawa</h3>
            <p className="text-sm text-muted-foreground">
              Melayani dengan kasih, bertumbuh dalam iman, dan menjadi berkat bagi sesama.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Sinode GKJ */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sinode GKJ</h3>
            <ul className="space-y-2">
              {navigation.sinode.map((item) => (
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
              {navigation.informasi.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary">
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
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {navigation.legal.map((item) => (
                <Link key={item.name} to={item.href} className="hover:text-primary">
                  {item.name}
                </Link>
              ))}
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {new Date().getFullYear()} Gereja Kristen Jawa. Semua Hak Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
