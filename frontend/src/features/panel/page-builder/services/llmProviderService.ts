import axios from 'axios';
import { z } from 'zod';

// Unified LLM Provider Interface
export interface LLMProvider {
  generateText(prompt: string, options?: GenerationOptions): Promise<string>;
  validateApiKey(apiKey: string): Promise<boolean>;
}

// Common Generation Options
export interface GenerationOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

// Provider-Specific Configurations
export interface ProviderConfig {
  apiKey: string;
  baseUrl?: string;
}

// OpenAI Provider
export class OpenAIProvider implements LLMProvider {
  private apiKey: string;

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey;
  }

  async generateText(prompt: string, options: GenerationOptions = {}): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', 
        {
          model: options.model || 'gpt-4-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate text with OpenAI');
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      await axios.post(
        'https://api.openai.com/v1/chat/completions',
        { model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: 'Test' }] },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return true;
    } catch {
      return false;
    }
  }
}

// Anthropic (Claude) Provider
export class AnthropicProvider implements LLMProvider {
  private apiKey: string;

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey;
  }

  async generateText(prompt: string, options: GenerationOptions = {}): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: options.model || 'claude-3-sonnet-20240229',
          messages: [{ role: 'user', content: prompt }],
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 1000
        },
        {
          headers: {
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          }
        }
      );

      return response.data.content[0].text;
    } catch (error) {
      console.error('Anthropic API Error:', error);
      throw new Error('Failed to generate text with Anthropic');
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      await axios.post(
        'https://api.anthropic.com/v1/messages',
        { 
          model: 'claude-3-sonnet-20240229', 
          messages: [{ role: 'user', content: 'Test' }] 
        },
        {
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          }
        }
      );
      return true;
    } catch {
      return false;
    }
  }
}

// Google (Gemini) Provider
export class GoogleGeminiProvider implements LLMProvider {
  private apiKey: string;

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey;
  }

  async generateText(prompt: string, options: GenerationOptions = {}): Promise<string> {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${options.model || 'gemini-pro'}:generateContent?key=${this.apiKey}`,
        {
          contents: [{ 
            parts: [{ text: prompt }] 
          }],
          generationConfig: {
            temperature: options.temperature || 0.7,
            maxOutputTokens: options.maxTokens || 1000
          }
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Google Gemini API Error:', error);
      throw new Error('Failed to generate text with Google Gemini');
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        { 
          contents: [{ parts: [{ text: 'Test' }] }] 
        }
      );
      return true;
    } catch {
      return false;
    }
  }
}

// Groq Provider (for open-source models)
export class GroqProvider implements LLMProvider {
  private apiKey: string;

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey;
  }

  async generateText(prompt: string, options: GenerationOptions = {}): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: options.model || 'llama2-70b-4096',
          messages: [{ role: 'user', content: prompt }],
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error('Failed to generate text with Groq');
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        { 
          model: 'llama2-70b-4096', 
          messages: [{ role: 'user', content: 'Test' }] 
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return true;
    } catch {
      return false;
    }
  }
}

// LLM Provider Factory
export class LLMProviderFactory {
  static createProvider(type: string, config: ProviderConfig): LLMProvider {
    switch (type.toLowerCase()) {
      case 'openai':
        return new OpenAIProvider(config);
      case 'anthropic':
        return new AnthropicProvider(config);
      case 'google':
      case 'gemini':
        return new GoogleGeminiProvider(config);
      case 'groq':
        return new GroqProvider(config);
      default:
        throw new Error(`Unsupported LLM Provider: ${type}`);
    }
  }

  // Validate API key for a specific provider
  static async validateProviderKey(type: string, apiKey: string): Promise<boolean> {
    try {
      const provider = this.createProvider(type, { apiKey });
      return await provider.validateApiKey(apiKey);
    } catch {
      return false;
    }
  }
}

// Unified Generation Service
export class LLMGenerationService {
  private provider: LLMProvider;

  constructor(type: string, config: ProviderConfig) {
    this.provider = LLMProviderFactory.createProvider(type, config);
  }

  async generate(prompt: string, options?: GenerationOptions): Promise<string> {
    return this.provider.generateText(prompt, options);
  }

  static async validateKey(type: string, apiKey: string): Promise<boolean> {
    return LLMProviderFactory.validateProviderKey(type, apiKey);
  }
}
