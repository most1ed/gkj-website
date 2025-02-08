import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  variant?: 'heading' | 'subheading' | 'body';
  title: string;
  description?: string;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  title,
  description,
  className
}) => {
  const variantStyles = {
    heading: 'text-2xl font-bold text-foreground',
    subheading: 'text-xl font-semibold text-muted-foreground',
    body: 'text-base text-muted-foreground'
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <h2 className={variantStyles[variant]}>{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
};
