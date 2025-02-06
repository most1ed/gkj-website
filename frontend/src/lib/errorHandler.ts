import { toast } from '@/components/ui/use-toast';

export class ErrorHandler {
  static handle(error: unknown, context?: string) {
    // Determine error message
    const errorMessage = 
      error instanceof Error 
        ? error.message 
        : typeof error === 'string' 
          ? error 
          : 'An unexpected error occurred';

    // Log error
    console.error(`[${context || 'Global Error Handler'}]`, error);

    // Show user-friendly toast
    toast({
      variant: 'destructive',
      title: 'Error',
      description: errorMessage,
      duration: 5000
    });

    // Optional: Send error to monitoring service
    this.reportToMonitoringService(error, context);
  }

  private static reportToMonitoringService(error: unknown, context?: string) {
    // Placeholder for actual error reporting service
    // Could integrate with services like Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // Example pseudo-code
      // Sentry.captureException(error, { 
      //   extra: { context }
      // });
    }
  }

  static createSafeHandler<T extends (...args: any[]) => any>(
    fn: T, 
    context?: string
  ): T {
    return ((...args: Parameters<T>): ReturnType<T> | undefined => {
      try {
        return fn(...args);
      } catch (error) {
        this.handle(error, context);
        return undefined;
      }
    }) as T;
  }
}
