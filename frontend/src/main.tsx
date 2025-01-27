import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ThemeProvider } from '@/components/common/theme/ThemeProvider';
import '@/styles/globals.css';
import App from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="system" storageKey="gkj-ui-theme">
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
