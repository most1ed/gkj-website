import { http, HttpResponse } from 'msw';

export const settingsHandlers = [
  // Add mock handlers for settings-related API calls
  http.get('/api/settings', () => {
    return HttpResponse.json({
      // Example default settings
      theme: 'light',
      language: 'id',
      notifications: true
    });
  }),
];
