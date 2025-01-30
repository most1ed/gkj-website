import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface PanelFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

export const PanelFooter: React.FC<PanelFooterProps> = ({ 
  className, 
  collapsed = false, 
  ...props 
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={cn(
        'text-xs text-muted-foreground text-center py-2',
        className
      )}
      {...props}
    >
      <div className="flex justify-center space-x-4">
        <Link 
          to="/privacy" 
          className="hover:text-primary transition-colors"
        >
          Privacy Policy
        </Link>
        <Link 
          to="/terms" 
          className="hover:text-primary transition-colors"
        >
          Terms & Conditions
        </Link>
      </div>
      <div className="mt-2">
        © {currentYear} Gereja Kristen Jawa. All rights reserved.
      </div>
    </footer>
  );
};
