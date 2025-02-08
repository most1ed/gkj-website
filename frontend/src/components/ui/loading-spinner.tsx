import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const variantClasses = {
    default: 'text-gray-500',
    primary: 'text-blue-500',
    secondary: 'text-gray-300'
  };

  return (
    <div 
      role="status" 
      className={cn(
        'animate-spin rounded-full border-4 border-current border-t-transparent',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
