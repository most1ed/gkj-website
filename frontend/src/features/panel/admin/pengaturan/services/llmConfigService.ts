import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  LLMConfig, 
  LLMProvider, 
  CompleteLLMConfig,
  DEFAULT_LLM_CONFIGS,
  LLMConfigSchema
} from '../types/llm-config';

// Initial mock data
const INITIAL_CONFIG: CompleteLLMConfig = {
  config: {
    provider: LLMProvider.OPENAI,
    apiKey: "",
    model: "gpt-4",
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
};

interface LLMConfigStore {
  currentConfig: CompleteLLMConfig;
  isLoading: boolean;
  error: string | null;
  
  // Configuration Management
  fetchConfig: () => Promise<void>;
  setLLMConfig: (config: Partial<LLMConfig>) => Promise<void>;
  resetToDefault: (provider?: LLMProvider) => Promise<void>;
  validateApiKey: (provider: LLMProvider, apiKey: string) => Promise<boolean>;
}

export const useLLMConfigStore = create<LLMConfigStore>()(
  persist(
    (set, get) => ({
      currentConfig: INITIAL_CONFIG,
      isLoading: false,
      error: null,
      
      fetchConfig: async () => {
        set({ isLoading: true, error: null });
        try {
          // For now, just use the current config since we're using mock data
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          // No need to set anything as we're using persisted data
        } catch (error) {
          set({ error: 'Failed to fetch LLM configuration' });
          console.error('Error fetching LLM config:', error);
        } finally {
          set({ isLoading: false });
        }
      },
      
      setLLMConfig: async (configUpdate) => {
        set({ isLoading: true, error: null });
        try {
          const currentConfig = get().currentConfig.config;
          const newConfig = { ...currentConfig, ...configUpdate };
          
          // Validate config
          LLMConfigSchema.parse(newConfig);
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ 
            currentConfig: {
              ...get().currentConfig,
              config: newConfig,
              updatedAt: new Date()
            }
          });
        } catch (error) {
          set({ error: 'Failed to update LLM configuration' });
          console.error('Error updating LLM config:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      resetToDefault: async (provider) => {
        set({ isLoading: true, error: null });
        try {
          const defaultProvider = provider || LLMProvider.OPENAI;
          const defaultConfig = DEFAULT_LLM_CONFIGS[defaultProvider];
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ 
            currentConfig: {
              config: defaultConfig,
              usage: {
                totalTokensUsed: 0,
                lastUsed: null,
                monthlyLimit: 100000
              },
              updatedAt: new Date()
            }
          });
        } catch (error) {
          set({ error: 'Failed to reset LLM configuration' });
          console.error('Error resetting LLM config:', error);
        } finally {
          set({ isLoading: false });
        }
      },
      
      validateApiKey: async (provider, apiKey) => {
        try {
          // Simulate API validation
          await new Promise(resolve => setTimeout(resolve, 500));
          return apiKey.length >= 10;
        } catch (error) {
          console.error('Error validating API key:', error);
          return false;
        }
      }
    }),
    {
      name: 'llm-config-storage',
      partialize: (state) => ({
        currentConfig: state.currentConfig
      })
    }
  )
);
