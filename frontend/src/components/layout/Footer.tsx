import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">GKJ</h3>
            <p className="text-sm text-muted-foreground">
              Melayani dengan kasih, bertumbuh dalam iman, dan menjadi berkat bagi sesama.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary">
                  Ibadah
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-sm text-muted-foreground hover:text-primary">
                  Warta
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pelayanan</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ministries" className="text-sm text-muted-foreground hover:text-primary">
                  Komisi
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-sm text-muted-foreground hover:text-primary">
                  Media
                </Link>
              </li>
              <li>
                <Link to="/offerings" className="text-sm text-muted-foreground hover:text-primary">
                  Persembahan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontak</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <p>
                  Kompleks Rasa Sayang<br />
                  Blok HH No. 1,<br />
                  Wijaya Kusuma, Grogol,<br />
                  Jakarta Barat 11460
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <p>(021) 5659044</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:gkjgrogol@yahoo.com" className="hover:text-primary">
                  gkjgrogol@yahoo.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0" />
                <a href="http://www.gkjgrogoljakarta.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  www.gkjgrogoljakarta.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p> {new Date().getFullYear()} GKJ Grogol Jakarta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
