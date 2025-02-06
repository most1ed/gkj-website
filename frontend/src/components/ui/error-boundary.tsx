import React, { ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [state, setState] = React.useState<ErrorBoundaryState>({
    hasError: false,
  });

  const handleError = React.useCallback((error: Error, errorInfo: ErrorInfo) => {
    // Log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
    
    setState({ 
      hasError: true, 
      error 
    });
  }, []);

  const resetErrorBoundary = React.useCallback(() => {
    setState({ hasError: false });
  }, []);

  React.useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      handleError(event.error, { componentStack: '' });
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, [handleError]);

  if (state.hasError) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-700 mb-2">
          Something went wrong
        </h1>
        <p className="text-red-600 mb-4">
          An unexpected error occurred. Please try again later.
        </p>
        <button 
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Try Again
        </button>
        {state.error && (
          <pre className="mt-4 p-2 bg-red-100 text-red-800 rounded text-xs overflow-x-auto">
            {state.error.toString()}
          </pre>
        )}
      </div>
    );
  }

  return <>{children}</>;
}

// Predefined error fallback components
export function ManagementErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-4">
      <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-2xl font-bold text-yellow-700 mb-2">
        Management Page Error
      </h1>
      <p className="text-yellow-600 mb-4">
        Unable to load management page. Please check your permissions or try again later.
      </p>
    </div>
  );
}

export function AdminErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-red-700 mb-2">
        Admin Page Access Denied
      </h1>
      <p className="text-red-600 mb-4">
        You do not have permission to access this admin page.
      </p>
    </div>
  );
}
