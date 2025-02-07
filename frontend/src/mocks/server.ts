import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This sets up the MSW server for Node.js environments
export const server = setupServer(...handlers);

export function setupMockServer() {
  server.listen({
    onUnhandledRequest: 'bypass'
  });
  
  // Clean up after tests
  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}
