import { http, HttpResponse } from 'msw';

// Mock widget data
export const widgetMock = {
  dashboard: [
    {
      id: 'widget-1',
      type: 'chart',
      title: 'Monthly Attendance',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        values: [120, 150, 180, 200, 220]
      }
    },
    {
      id: 'widget-2',
      type: 'summary',
      title: 'Financial Overview',
      data: {
        totalIncome: 500000,
        totalExpenses: 350000,
        netProfit: 150000
      }
    }
  ]
};

// MSW handlers for widget-related API calls
export const widgetHandlers = [
  http.get('/api/widgets', () => {
    return HttpResponse.json(widgetMock.dashboard);
  }),
  http.get('/api/widgets/:id', ({ params }) => {
    const widget = widgetMock.dashboard.find(w => w.id === params.id);
    return widget 
      ? HttpResponse.json(widget) 
      : HttpResponse.json({ error: 'Widget not found' }, { status: 404 });
  })
];
