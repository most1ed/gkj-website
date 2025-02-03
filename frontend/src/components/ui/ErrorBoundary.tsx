import React, { ErrorInfo } from 'react';
import { Button } from './Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-red-50 text-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Terjadi Kesalahan
            </h2>
            <p className="text-red-500 mb-6">
              {this.state.error?.message || 'Maaf, terjadi kesalahan yang tidak terduga.'}
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="destructive" 
                onClick={this.handleReset}
              >
                Coba Lagi
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Muat Ulang Halaman
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
