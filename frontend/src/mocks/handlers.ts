import { http, HttpResponse } from 'msw';
import { LLMProvider } from '@/features/panel/admin/pengaturan/types/llm-config';

// Mock data for pengaturan endpoint
export const pengaturanMockData = {
  general: {
    siteName: 'GKJ Website',
    siteDescription: 'Official Website of Gereja Kristen Jawa',
    logo: '/logo.png',
    favicon: '/favicon.ico',
  },
  contact: {
    email: 'info@gkj.org',
    phone: '+62 123 456 7890',
    address: 'Jl. Contoh No. 123, Kota, Provinsi',
  },
  llmConfiguration: {
    provider: 'openai',
    apiKey: '',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 1000,
    enabledFeatures: {
      articleGeneration: true,
      socialMediaContent: true,
      pageBuilder: true,
    }
  },
  socialMedia: {
    facebook: 'https://facebook.com/gkj',
    twitter: 'https://twitter.com/gkj',
    instagram: 'https://instagram.com/gkj',
  }
};

// Page Persistence Mock Data
const pages: any[] = [
  {
    id: 'initial_page_1',
    title: 'Halaman Awal Contoh',
    content: {
      // Example Easyblocks content structure
      root: {
        type: 'Section',
        props: {
          title: 'Contoh Halaman Awal'
        },
        children: [
          {
            type: 'Heading',
            props: {
              text: 'Selamat Datang di Halaman Baru'
            }
          }
        ]
      }
    },
    type: 'DRAFT',
    authorId: 'user_admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const handlers = [
  // Handler for pengaturan endpoint
  http.get('http://localhost:3001/api/pengaturan', () => {
    try {
      return HttpResponse.json(pengaturanMockData, { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Error retrieving configuration', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }
  }),

  // LLM Configuration Handlers
  http.get('/api/llm/config', () => {
    try {
      return HttpResponse.json({
        config: {
          provider: 'openai',
          apiKey: '',
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 1000,
          enabled: true
        },
        usage: {
          totalTokensUsed: 0,
          lastUsed: null,
          monthlyLimit: 100000
        },
        updatedAt: new Date().toISOString()
      }, { status: 200 });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Error retrieving LLM configuration', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }
  }),

  http.put('/api/llm/config', async (req) => {
    try {
      const body = await req.json();
      return HttpResponse.json({
        ...body,
        updatedAt: new Date().toISOString()
      }, { status: 200 });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Error updating LLM configuration', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 400 });
    }
  }),

  http.post('/api/llm/reset', async (req) => {
    try {
      const { provider } = await req.json();
      return HttpResponse.json({
        config: {
          provider: provider || 'openai',
          apiKey: '',
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 1000,
          enabled: true
        },
        usage: {
          totalTokensUsed: 0,
          lastUsed: null,
          monthlyLimit: 100000
        },
        updatedAt: new Date().toISOString()
      }, { status: 200 });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Error resetting LLM configuration', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 400 });
    }
  }),

  http.post('/api/llm/validate', async (req) => {
    try {
      const { apiKey } = await req.json();
      return HttpResponse.json({
        valid: apiKey.length >= 10
      }, { status: 200 });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Error validating API key', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 400 });
    }
  }),

  // Page Persistence Handlers
  http.post('/api/pages', async (req) => {
    try {
      const newPageData = await req.json();
      const newPage = {
        ...newPageData,
        id: `page_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: newPageData.type || 'DRAFT'
      };
      pages.push(newPage);
      return HttpResponse.json(newPage, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Invalid page data', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 400 });
    }
  }),

  http.get('/api/pages', ({ request }) => {
    try {
      const url = new URL(request.url);
      const type = url.searchParams.get('type');
      const filteredPages = type 
        ? pages.filter(page => page.type === type)
        : pages;
      
      return HttpResponse.json(filteredPages, { status: 200 });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Error retrieving pages', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }
  }),

  http.patch('/api/pages/:id', async ({ params, request }) => {
    try {
      const { id } = params;
      const updatedData = await request.json();
      
      const pageIndex = pages.findIndex(p => p.id === id);
      if (pageIndex === -1) {
        return HttpResponse.json({ message: 'Page not found' }, { status: 404 });
      }

      pages[pageIndex] = {
        ...pages[pageIndex],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };

      return HttpResponse.json(pages[pageIndex], { status: 200 });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Error updating page', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 400 });
    }
  }),

  http.delete('/api/pages/:id', ({ params }) => {
    try {
      const { id } = params;
      const pageIndex = pages.findIndex(p => p.id === id);
      
      if (pageIndex === -1) {
        return HttpResponse.json({ message: 'Page not found' }, { status: 404 });
      }

      pages.splice(pageIndex, 1);
      
      return new HttpResponse(null, { status: 204 });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Error deleting page', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }
  }),

  // Mock Offerings API
  http.get('/api/offerings', () => {
    try {
      return HttpResponse.json([
        {
          id: 'sunday-offering',
          type: 'SUNDAY',
          title: 'Persembahan Minggu',
          description: 'Persembahan rutin untuk kegiatan gereja setiap minggu',
          targetAmount: 50000000,
          currentAmount: 35000000,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'ACTIVE'
        }
      ], { status: 200 });
    } catch (error) {
      return HttpResponse.json({ 
        message: 'Error retrieving offerings', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }
  }),

  // Add more mock handlers as needed
];
