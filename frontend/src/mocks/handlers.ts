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

export const handlers = [
  // Handler for pengaturan endpoint
  http.get('http://localhost:3001/api/pengaturan', () => {
    return HttpResponse.json(pengaturanMockData, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }),

  // LLM Configuration Handlers
  http.get('/api/llm/config', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
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
        updatedAt: new Date()
      })
    );
  }),

  http.put('/api/llm/config', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        ...body,
        updatedAt: new Date()
      })
    );
  }),

  http.post('/api/llm/reset', async (req, res, ctx) => {
    const { provider } = await req.json();
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
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
        updatedAt: new Date()
      })
    );
  }),

  http.post('/api/llm/validate', async (req, res, ctx) => {
    const { apiKey } = await req.json();
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        valid: apiKey.length >= 10
      })
    );
  }),

  // Add more mock handlers as needed
];
