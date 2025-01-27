import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  InformationCircleIcon, 
  DocumentTextIcon,
  MegaphoneIcon,
  PhotoIcon,
  HeartIcon,
  UserGroupIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const sitemapSections = [
  {
    category: 'Navigasi Utama',
    items: [
      { 
        title: 'Beranda', 
        path: '/', 
        icon: HomeIcon,
        description: 'Halaman depan dengan informasi terkini'
      },
      { 
        title: 'Tentang Kami', 
        path: '/about', 
        icon: InformationCircleIcon,
        description: 'Sejarah, visi, misi, dan struktur organisasi'
      },
      { 
        title: 'Ibadah', 
        path: '/services', 
        icon: DocumentTextIcon,
        description: 'Jadwal dan informasi layanan ibadah'
      }
    ]
  },
  {
    category: 'Pelayanan & Media',
    items: [
      { 
        title: 'Pelayanan', 
        path: '/ministries', 
        icon: UserGroupIcon,
        description: 'Komisi dan bidang pelayanan gereja'
      },
      { 
        title: 'Media', 
        path: '/media', 
        icon: PhotoIcon,
        description: 'Galeri foto, video, dan publikasi'
      },
      { 
        title: 'Warta', 
        path: '/announcements', 
        icon: MegaphoneIcon,
        description: 'Pengumuman dan berita terbaru'
      }
    ]
  },
  {
    category: 'Administrasi',
    items: [
      { 
        title: 'Persembahan', 
        path: '/offerings', 
        icon: HeartIcon,
        description: 'Informasi dan panduan persembahan'
      },
      { 
        title: 'Jadwal Kegiatan', 
        path: '/schedule', 
        icon: DocumentTextIcon,
        description: 'Kalender kegiatan gereja'
      }
    ]
  },
  {
    category: 'Sumber Daya Sinode',
    items: [
      { 
        title: 'Berita Sinode', 
        href: 'https://sinodegkj.or.id/berita/', 
        icon: MegaphoneIcon,
        description: 'Berita terkini dari Sinode GKJ'
      },
      { 
        title: 'Kotbah Jangkep', 
        href: 'https://sinodegkj.or.id/materi/kotbah/', 
        icon: DocumentTextIcon,
        description: 'Kumpulan kotbah lengkap'
      },
      { 
        title: 'Renungan Harian', 
        href: 'https://sinodegkj.or.id/materi/renungan-harian/', 
        icon: HeartIcon,
        description: 'Renungan harian untuk pendalaman iman'
      }
    ]
  },
  {
    category: 'Informasi Legal',
    items: [
      { 
        title: 'Kebijakan Privasi', 
        path: '/privacy-policy', 
        icon: LockClosedIcon,
        description: 'Perlindungan data dan privasi'
      },
      { 
        title: 'Syarat & Ketentuan', 
        path: '/terms', 
        icon: DocumentTextIcon,
        description: 'Ketentuan penggunaan layanan'
      },
      { 
        title: 'Struktur Organisasi', 
        path: '/organizational-structure', 
        icon: UserGroupIcon,
        description: 'Struktur kepemimpinan gereja'
      }
    ]
  }
];

export default function Sitemap() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 max-w-6xl"
    >
      <Helmet>
        <title>Peta Situs - GKJ Grogol Jakarta</title>
        <meta name="description" content="Navigasi lengkap website GKJ Grogol Jakarta" />
      </Helmet>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Peta Situs
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Jelajahi seluruh konten dan layanan GKJ Grogol Jakarta dengan mudah
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sitemapSections.map((section) => (
          <div
            key={section.category}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold text-foreground border-b border-border pb-3 mb-4">
              {section.category}
            </h2>

            {section.items.map((item) => {
              const LinkComponent = item.path ? Link : 'a';
              const linkProps = item.path 
                ? { to: item.path } 
                : { href: item.href, target: '_blank', rel: 'noopener noreferrer' };

              return (
                <LinkComponent
                  key={item.title}
                  {...linkProps}
                  className="flex items-center space-x-4 group hover:bg-accent/10 p-3 -mx-3 rounded-lg transition-colors"
                >
                  <item.icon 
                    className="h-8 w-8 text-primary/60 
                      group-hover:text-primary transition-colors" 
                  />
                  <div>
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </LinkComponent>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground/50">
          Terakhir diperbarui: Januari 2024 | Versi 1.3
        </p>
      </div>
    </motion.div>
  );
}
