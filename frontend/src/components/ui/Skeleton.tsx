import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'text';
}

export function Skeleton({ 
  className, 
  variant = 'default', 
  ...props 
}: SkeletonProps) {
  const variantClasses = {
    default: 'bg-muted animate-pulse rounded',
    card: 'bg-muted animate-pulse rounded-lg p-4 space-y-4',
    text: 'bg-muted animate-pulse rounded-sm h-4 w-full'
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 p-4 bg-white border rounded-lg">
      <div className="flex items-center space-x-4">
        <Skeleton variant="default" className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-3/4" />
    </div>
  );
}

export function SkeletonList({ 
  count = 3, 
  variant = 'card' 
}: { 
  count?: number, 
  variant?: 'card' | 'text' 
}) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        variant === 'card' ? <SkeletonCard key={index} /> : <Skeleton key={index} variant="text" />
      ))}
    </div>
  );
}
