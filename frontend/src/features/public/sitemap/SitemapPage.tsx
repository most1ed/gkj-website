import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const sitemapData = {
  beranda: {
    title: 'Beranda',
    path: '/',
    items: []
  },
  tentangKami: {
    title: 'Tentang Kami',
    path: '/about',
    items: [
      { title: 'Sejarah GKJ', path: '/about#sejarah' },
      { title: 'Visi & Misi', path: '/about#visi-misi' },
      { title: 'Majelis', path: '/about#majelis' },
      { title: 'Pendeta', path: '/about#pendeta' },
      { title: 'Lokasi', path: '/about#lokasi' },
    ]
  },
  ibadah: {
    title: 'Ibadah',
    path: '/services',
    items: [
      { title: 'Jadwal Ibadah', path: '/services#jadwal' },
      { title: 'Ibadah Minggu', path: '/services#minggu' },
      { title: 'Ibadah Kategorial', path: '/services#kategorial' },
      { title: 'Ibadah Khusus', path: '/services#khusus' },
      { title: 'Streaming', path: '/services#streaming' },
    ]
  },
  warta: {
    title: 'Warta',
    path: '/announcements',
    items: [
      { title: 'Warta Jemaat', path: '/announcements' },
      { title: 'Arsip Warta', path: '/arsip-warta' },
      { title: 'Jadwal Kegiatan', path: '/schedule' },
      { title: 'Berita', path: '/news' },
    ]
  },
  pelayanan: {
    title: 'Pelayanan',
    path: '/ministries',
    items: [
      { title: 'Komisi Anak', path: '/ministries#anak' },
      { title: 'Komisi Remaja', path: '/ministries#remaja' },
      { title: 'Komisi Pemuda', path: '/ministries#pemuda' },
      { title: 'Komisi Dewasa', path: '/ministries#dewasa' },
      { title: 'Komisi Lansia', path: '/ministries#lansia' },
      { title: 'Komisi Kesenian', path: '/ministries#kesenian' },
      { title: 'Bidang Pembinaan', path: '/ministries#pembinaan' },
      { title: 'Bidang Kesaksian', path: '/ministries#kesaksian' },
      { title: 'Bidang Pelayanan', path: '/ministries#pelayanan' },
    ]
  },
  media: {
    title: 'Media',
    path: '/media',
    items: [
      { title: 'Galeri Foto', path: '/media#foto' },
      { title: 'Video Ibadah', path: '/media#video' },
      { title: 'Audio Khotbah', path: '/media#audio' },
      { title: 'Materi Pembinaan', path: '/media#materi' },
      { title: 'Publikasi', path: '/media#publikasi' },
    ]
  },
  persembahan: {
    title: 'Persembahan',
    path: '/offerings',
    items: [
      { title: 'Persembahan Mingguan', path: '/offerings#mingguan' },
      { title: 'Persembahan Khusus', path: '/offerings#khusus' },
      { title: 'Laporan Keuangan', path: '/offerings#laporan' },
      { title: 'Cara Memberi', path: '/offerings#panduan' },
    ]
  },
  akun: {
    title: 'Akun',
    path: '/login',
    items: [
      { title: 'Masuk', path: '/login' },
      { title: 'Daftar', path: '/register' },
      { title: 'Lupa Password', path: '/forgot-password' },
    ]
  },
  legal: {
    title: 'Legal',
    items: [
      { title: 'Kebijakan Privasi', path: '/privacy-policy' },
      { title: 'Syarat & Ketentuan', path: '/terms' },
      { title: 'Peta Situs', path: '/sitemap' },
    ]
  }
};

export default function Sitemap() {
  return (
    <>
      <Helmet>
        <title>Peta Situs - GKJ Grogol Jakarta</title>
        <meta name="description" content="Peta situs GKJ Grogol Jakarta - Temukan semua halaman dan konten website dengan mudah" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Peta Situs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(sitemapData).map((section) => (
            <div key={section.title} className="space-y-4">
              <h2 className="text-xl font-semibold">
                {section.path ? (
                  <Link to={section.path} className="hover:text-primary">
                    {section.title}
                  </Link>
                ) : (
                  section.title
                )}
              </h2>
              {section.items && section.items.length > 0 && (
                <ul className="space-y-2 ml-4">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">Sumber Daya Sinode GKJ</h2>
          <ul className="space-y-2 ml-4">
            <li>
              <a
                href="https://sinodegkj.or.id/berita/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                Berita Sinode
              </a>
            </li>
            <li>
              <a
                href="https://sinodegkj.or.id/materi/kotbah/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                Kotbah Jangkep
              </a>
            </li>
            <li>
              <a
                href="https://sinodegkj.or.id/materi/renungan-harian/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                Renungan Harian
              </a>
            </li>
            <li>
              <a
                href="https://perpustakaan.sinodegkj.or.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                Perpustakaan Sinode
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
