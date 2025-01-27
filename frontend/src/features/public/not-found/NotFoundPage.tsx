import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-semibold mb-4">Halaman Tidak Ditemukan</p>
        <p className="text-muted-foreground mb-6">
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Home className="h-5 w-5" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
