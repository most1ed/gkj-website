import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from '@/components/common/theme/ThemeToggle';
import { Home, Menu, LogIn, BookOpen } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">GKJ</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              <Home className="h-5 w-5" />
            </Link>
            <Link to="/bible" className="text-sm font-medium hover:text-primary">
              <BookOpen className="h-5 w-5" />
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary">
              Tentang Kami
            </Link>
            <Link to="/services" className="text-sm font-medium hover:text-primary">
              Ibadah
            </Link>
            <Link to="/announcements" className="text-sm font-medium hover:text-primary">
              Warta
            </Link>
            <Link to="/ministries" className="text-sm font-medium hover:text-primary">
              Pelayanan
            </Link>
            <Link to="/media" className="text-sm font-medium hover:text-primary">
              Media
            </Link>
            <Link to="/offerings" className="text-sm font-medium hover:text-primary">
              Persembahan
            </Link>
            <div className="ml-4 border-l pl-4 flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/auth/login" className="text-sm font-medium hover:text-primary">
                <LogIn className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/auth/login" className="text-sm font-medium hover:text-primary">
              <LogIn className="h-6 w-6" />
            </Link>
            <ThemeToggle />
            <button className="p-2 hover:bg-accent rounded-md">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
