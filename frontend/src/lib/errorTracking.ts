import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

export function initErrorTracking() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.5, // Capture 50% of transactions
    debug: import.meta.env.DEV,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_VERSION,
    
    beforeSend(event) {
      // Filter out sensitive information
      if (event.user) {
        delete event.user.email;
      }
      return event;
    }
  });
}

export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, String(context[key]));
      });
    }
    Sentry.captureException(error);
  });
}

export function logMessage(message: string, level: Sentry.Severity = 'info') {
  Sentry.captureMessage(message, level);
}
