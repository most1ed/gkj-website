import { ErrorInfo } from 'react';

export interface ErrorLogData {
  error: Error;
  errorInfo?: ErrorInfo;
  context?: string;
  severity?: 'low' | 'medium' | 'high';
  userId?: string;
}

class ErrorLoggingService {
  private static instance: ErrorLoggingService;
  private errorQueue: ErrorLogData[] = [];

  private constructor() {
    // Initialize error logging
    this.setupErrorLogging();
  }

  public static getInstance(): ErrorLoggingService {
    if (!ErrorLoggingService.instance) {
      ErrorLoggingService.instance = new ErrorLoggingService();
    }
    return ErrorLoggingService.instance;
  }

  private setupErrorLogging() {
    // Setup global error handlers
    window.addEventListener('error', this.handleGlobalError);
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  private handleGlobalError = (event: ErrorEvent) => {
    this.logError({
      error: event.error || new Error(event.message),
      context: 'Global Window Error',
      severity: 'high'
    });
  };

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.logError({
      error: event.reason || new Error('Unhandled Promise Rejection'),
      context: 'Unhandled Promise Rejection',
      severity: 'high'
    });
  };

  public logError(errorData: ErrorLogData) {
    // Add to error queue
    this.errorQueue.push(errorData);

    // Log to console
    console.error('Page Builder Error:', {
      message: errorData.error.message,
      stack: errorData.error.stack,
      context: errorData.context,
      severity: errorData.severity
    });

    // In a real-world scenario, you would send this to your error tracking service
    this.sendErrorToTrackingService(errorData);
  }

  private sendErrorToTrackingService(errorData: ErrorLogData) {
    // Simulated error tracking
    // Replace with actual error tracking service like Sentry, LogRocket, etc.
    try {
      const errorPayload = {
        message: errorData.error.message,
        stack: errorData.error.stack,
        context: errorData.context,
        severity: errorData.severity,
        timestamp: new Date().toISOString(),
        // Add more metadata as needed
        componentStack: errorData.errorInfo?.componentStack
      };

      // Simulated API call
      fetch('/api/error-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorPayload)
      }).catch(console.error);
    } catch (trackingError) {
      console.error('Error logging failed', trackingError);
    }
  }

  // Method to retrieve error logs (useful for debugging)
  public getErrorLogs(): ErrorLogData[] {
    return [...this.errorQueue];
  }

  // Method to clear error logs
  public clearErrorLogs() {
    this.errorQueue = [];
  }
}

// Export singleton instance
export const errorLoggingService = ErrorLoggingService.getInstance();

// Utility function for easy error logging
export function logErrorToService(errorData: ErrorLogData) {
  errorLoggingService.logError(errorData);
}
