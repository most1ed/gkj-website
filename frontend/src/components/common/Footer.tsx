import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Settings, 
  Shield 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { 
      icon: HelpCircle, 
      title: 'Bantuan', 
      href: '/dashboard/help' 
    },
    { 
      icon: Settings, 
      title: 'Pengaturan', 
      href: '/dashboard/settings' 
    },
    { 
      icon: Shield, 
      title: 'Privasi', 
      href: '/privacy' 
    }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Copyright */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {currentYear} Gereja Kristen Jemaat
        </div>

        {/* Footer Links */}
        <div className="flex items-center space-x-4">
          {footerLinks.map((link) => (
            <Link 
              key={link.href}
              to={link.href}
              className="flex items-center text-gray-600 hover:text-primary dark:text-gray-300 transition-colors"
            >
              <link.icon className="w-4 h-4 mr-1" />
              <span className="text-xs">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
