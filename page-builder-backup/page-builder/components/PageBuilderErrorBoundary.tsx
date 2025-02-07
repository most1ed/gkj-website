import React, { ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logErrorToService } from '../services/errorLoggingService';

interface PageBuilderErrorBoundaryProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

interface PageBuilderErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class PageBuilderErrorBoundary extends React.Component<
  PageBuilderErrorBoundaryProps, 
  PageBuilderErrorBoundaryState
> {
  constructor(props: PageBuilderErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to external service
    logErrorToService({
      error,
      errorInfo,
      context: 'PageBuilder',
      severity: 'high'
    });

    // Optional: Send error to monitoring service
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
            <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              {this.props.fallbackMessage || 'Something went wrong in Page Builder'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              An unexpected error occurred. Please try again or contact support.
            </p>
            
            {this.state.error && (
              <details className="text-left bg-gray-100 p-4 rounded-md mb-4 max-h-48 overflow-auto">
                <summary className="cursor-pointer text-gray-700 font-semibold">
                  Error Details
                </summary>
                <pre className="text-xs text-red-700 whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            
            <div className="flex justify-center space-x-4">
              <Button 
                variant="destructive" 
                onClick={this.handleReset}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Page Builder
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
