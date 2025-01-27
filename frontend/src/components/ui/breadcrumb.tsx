import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className }: BreadcrumbProps) {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const isLast = index === paths.length - 1;
    const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

    return {
      href,
      title,
      isLast,
    };
  });

  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              to={breadcrumb.href}
              className={cn(
                "ml-2 text-sm font-medium",
                breadcrumb.isLast
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={breadcrumb.isLast ? "page" : undefined}
            >
              {breadcrumb.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
