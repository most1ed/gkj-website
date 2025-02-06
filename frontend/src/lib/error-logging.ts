// Centralized error logging utility

export function logError(error: unknown, context?: string): void {
  // Basic error logging implementation
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  console.error(`[ERROR${context ? ` - ${context}` : ''}]`, errorMessage);

  // Optional: Add more advanced logging like:
  // - Sending to error tracking service (e.g., Sentry)
  // - Logging to a file
  // - Sending to a backend error logging endpoint
  
  // Example with optional context
  if (error instanceof Error && error.stack) {
    console.error('Stack Trace:', error.stack);
  }
}

// Optional: Advanced error tracking function
export function trackError(error: unknown, metadata?: Record<string, unknown>): void {
  logError(error, metadata ? JSON.stringify(metadata) : undefined);
  
  // Here you could integrate with error tracking services like Sentry, LogRocket, etc.
  // Example (pseudo-code):
  // Sentry.captureException(error, { extra: metadata });
}
