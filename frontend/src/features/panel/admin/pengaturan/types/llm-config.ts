import { z } from 'zod';

// Supported LLM Providers
export enum LLMProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE_GEMINI = 'google_gemini',
  GROQ = 'groq',
  CUSTOM = 'custom'
}

// Provider-Specific Models
export const ProviderModels = {
  [LLMProvider.OPENAI]: [
    'gpt-3.5-turbo',
    'gpt-4',
    'gpt-4-turbo',
    'gpt-4-vision-preview'
  ],
  [LLMProvider.ANTHROPIC]: [
    'claude-3-opus-20240229',
    'claude-3-sonnet-20240229',
    'claude-3-haiku-20240307'
  ],
  [LLMProvider.GOOGLE_GEMINI]: [
    'gemini-pro',
    'gemini-pro-vision',
    'gemini-ultra'
  ],
  [LLMProvider.GROQ]: [
    'llama2-70b-4096',
    'mixtral-8x7b-32768'
  ],
  [LLMProvider.CUSTOM]: ['custom-model']
};

// LLM Configuration Schema
export const LLMConfigSchema = z.object({
  provider: z.nativeEnum(LLMProvider),
  apiKey: z.string().min(10, "API Key must be at least 10 characters"),
  model: z.string(),
  temperature: z.number().min(0).max(1).default(0.7),
  maxTokens: z.number().min(10).max(4096).default(1000),
  enabled: z.boolean().default(true)
});

// Usage Tracking Schema
export const LLMUsageSchema = z.object({
  totalTokensUsed: z.number().default(0),
  lastUsed: z.date().optional(),
  monthlyLimit: z.number().default(100000)
});

// Comprehensive LLM Configuration
export const CompleteLLMConfigSchema = z.object({
  config: LLMConfigSchema,
  usage: LLMUsageSchema,
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
});

// Types derived from Schemas
export type LLMConfig = z.infer<typeof LLMConfigSchema>;
export type LLMUsage = z.infer<typeof LLMUsageSchema>;
export type CompleteLLMConfig = z.infer<typeof CompleteLLMConfigSchema>;

// Default Configurations
export const DEFAULT_LLM_CONFIGS: Record<LLMProvider, Partial<LLMConfig>> = {
  [LLMProvider.OPENAI]: {
    provider: LLMProvider.OPENAI,
    model: 'gpt-4-turbo',
    temperature: 0.7,
    maxTokens: 1000
  },
  [LLMProvider.ANTHROPIC]: {
    provider: LLMProvider.ANTHROPIC,
    model: 'claude-3-sonnet-20240229',
    temperature: 0.6,
    maxTokens: 1000
  },
  [LLMProvider.GOOGLE_GEMINI]: {
    provider: LLMProvider.GOOGLE_GEMINI,
    model: 'gemini-pro',
    temperature: 0.7,
    maxTokens: 1000
  },
  [LLMProvider.GROQ]: {
    provider: LLMProvider.GROQ,
    model: 'llama2-70b-4096',
    temperature: 0.7,
    maxTokens: 1000
  },
  [LLMProvider.CUSTOM]: {
    provider: LLMProvider.CUSTOM,
    model: 'custom-model',
    temperature: 0.7,
    maxTokens: 1000
  }
};
