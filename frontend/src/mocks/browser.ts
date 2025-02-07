import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// This configures the MSW worker for browser
export const worker = setupWorker(...handlers);

// Function to start the mock service worker
export const startMockServiceWorker = () => {
  if (import.meta.env.DEV) {
    worker.start({
      onUnhandledRequest: 'bypass'
    });
  }
};
