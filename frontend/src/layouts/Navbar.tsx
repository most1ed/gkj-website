import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/Button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { UserIcon, LogOutIcon, HomeIcon, SettingsIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/common/theme/ThemeToggle';
import { Home, Menu, LogIn, BookOpen } from "lucide-react";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleHome = () => {
    navigate('/');
  };

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
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <UserIcon className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user?.username || 'My Account'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleHome}>
                      <HomeIcon className="mr-2 h-4 w-4" />
                      Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleProfile}>
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth/login" className="text-sm font-medium hover:text-primary">
                  <LogIn className="h-5 w-5" />
                </Link>
              )}
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
