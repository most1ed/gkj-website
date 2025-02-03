import React, { Component, ErrorInfo, ReactNode } from 'react';
import { mockApi } from '@/lib/mock';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error using mock API error logger
    const mockError = mockApi.errors.createMockApiError(
      mockApi.errors.MockApiErrorType.SERVER_ERROR,
      error.message,
      { 
        componentStack: errorInfo.componentStack 
      }
    );

    mockApi.errors.MockApiErrorLogger.log(mockError);

    // Optional custom error handling
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // You could potentially send error to a logging service here
    this.setState({ 
      hasError: true, 
      error, 
      errorInfo 
    });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for error boundary
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>, 
  fallback?: ReactNode
) {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
}

// Async error handler for hooks and async functions
export const handleAsyncError = async (
  asyncFn: () => Promise<any>, 
  errorHandler?: (error: Error) => void
) => {
  try {
    return await asyncFn();
  } catch (error) {
    if (error instanceof Error) {
      const mockError = mockApi.errors.createMockApiError(
        mockApi.errors.MockApiErrorType.SERVER_ERROR,
        error.message
      );

      mockApi.errors.MockApiErrorLogger.log(mockError);

      if (errorHandler) {
        errorHandler(mockError);
      }
    }
    throw error;
  }
};
