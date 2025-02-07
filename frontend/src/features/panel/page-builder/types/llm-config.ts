// Supported LLM Providers
export enum LLMProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE_GEMINI = 'google_gemini',
  CUSTOM = 'custom'
}

// LLM Model Configurations
export enum OpenAIModel {
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  GPT_4 = 'gpt-4',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_4_VISION = 'gpt-4-vision-preview'
}

export enum AnthropicModel {
  CLAUDE_2 = 'claude-2',
  CLAUDE_3_OPUS = 'claude-3-opus-20240229',
  CLAUDE_3_SONNET = 'claude-3-sonnet-20240229'
}

export enum GoogleGeminiModel {
  PRO = 'gemini-pro',
  ULTRA = 'gemini-ultra'
}

// Base Configuration Interface
export interface BaseLLMConfig {
  provider: LLMProvider;
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

// Specific Provider Configurations
export interface OpenAIConfig extends BaseLLMConfig {
  provider: LLMProvider.OPENAI;
  model: OpenAIModel;
}

export interface AnthropicConfig extends BaseLLMConfig {
  provider: LLMProvider.ANTHROPIC;
  model: AnthropicModel;
}

export interface GoogleGeminiConfig extends BaseLLMConfig {
  provider: LLMProvider.GOOGLE_GEMINI;
  model: GoogleGeminiModel;
}

export interface CustomLLMConfig extends BaseLLMConfig {
  provider: LLMProvider.CUSTOM;
  apiEndpoint: string;
}

// Union Type for all configurations
export type LLMConfiguration = 
  | OpenAIConfig 
  | AnthropicConfig 
  | GoogleGeminiConfig 
  | CustomLLMConfig;

// Default Configurations
export const DEFAULT_LLM_CONFIGS: Record<LLMProvider, Partial<BaseLLMConfig>> = {
  [LLMProvider.OPENAI]: {
    provider: LLMProvider.OPENAI,
    model: OpenAIModel.GPT_4_TURBO,
    temperature: 0.7,
    maxTokens: 1000
  },
  [LLMProvider.ANTHROPIC]: {
    provider: LLMProvider.ANTHROPIC,
    model: AnthropicModel.CLAUDE_3_SONNET,
    temperature: 0.6,
    maxTokens: 1000
  },
  [LLMProvider.GOOGLE_GEMINI]: {
    provider: LLMProvider.GOOGLE_GEMINI,
    model: GoogleGeminiModel.PRO,
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

// Validation and Utility Functions
export function validateLLMConfig(config: LLMConfiguration): boolean {
  // Basic validation
  if (!config.apiKey) return false;
  if (config.temperature && (config.temperature < 0 || config.temperature > 1)) return false;
  
  return true;
}

export function getDefaultConfigForProvider(provider: LLMProvider): Partial<BaseLLMConfig> {
  return DEFAULT_LLM_CONFIGS[provider];
}

// Configuration Management Interface
export interface LLMConfigurationManager {
  getCurrentConfig(): LLMConfiguration;
  updateConfig(config: Partial<LLMConfiguration>): void;
  resetToDefault(provider?: LLMProvider): void;
  listAvailableProviders(): LLMProvider[];
}
