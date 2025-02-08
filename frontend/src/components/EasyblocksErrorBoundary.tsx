import React, { ErrorInfo } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class EasyblocksErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to your preferred error tracking service
    console.error('Easyblocks Error:', error, errorInfo);
    
    this.setState({ 
      error, 
      errorInfo 
    });

    // Optional: Send error to monitoring service
    // logErrorToService({
    //   error,
    //   componentStack: errorInfo.componentStack,
    //   context: 'Easyblocks Editor'
    // });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI or use provided fallback
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-bold mb-2">
            Something went wrong in Easyblocks Editor
          </h2>
          <pre className="text-red-600 text-sm mb-4">
            {this.state.error?.toString()}
          </pre>
          <div className="flex space-x-2">
            <Button onClick={this.handleReset} variant="destructive">
              Try Again
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
            >
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
