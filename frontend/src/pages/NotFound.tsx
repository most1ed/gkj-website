import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Halaman Tidak Ditemukan</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. 
          Silakan kembali ke halaman utama atau hubungi kami jika Anda memerlukan bantuan.
        </p>
        <div className="pt-4">
          <Button asChild>
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
