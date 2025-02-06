import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/global.css';
import App from './App';

async function initMockServiceWorker() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./lib/mock');
    return worker.start();
  }
  return Promise.resolve();
}

initMockServiceWorker().then(() => {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 30000,
      },
    },
  });

  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root element not found');
  }

  createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
});
