import { 
  LLMConfiguration, 
  LLMProvider, 
  BaseLLMConfig,
  validateLLMConfig,
  getDefaultConfigForProvider,
  OpenAIConfig,
  AnthropicConfig,
  GoogleGeminiConfig,
  CustomLLMConfig
} from '../types/llm-config';

class LLMConfigService {
  private static instance: LLMConfigService;
  private currentConfig: LLMConfiguration | null = null;

  private constructor() {
    this.loadConfigFromStorage();
  }

  // Singleton pattern
  public static getInstance(): LLMConfigService {
    if (!LLMConfigService.instance) {
      LLMConfigService.instance = new LLMConfigService();
    }
    return LLMConfigService.instance;
  }

  // Load configuration from local storage
  private loadConfigFromStorage(): void {
    try {
      const storedConfig = localStorage.getItem('llm-config');
      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig);
        if (validateLLMConfig(parsedConfig)) {
          this.currentConfig = parsedConfig;
        }
      }
    } catch (error) {
      console.warn('Error loading LLM configuration:', error);
    }
  }

  // Save configuration to local storage
  private saveConfigToStorage(): void {
    if (this.currentConfig) {
      try {
        localStorage.setItem('llm-config', JSON.stringify(this.currentConfig));
      } catch (error) {
        console.warn('Error saving LLM configuration:', error);
      }
    }
  }

  // Get current configuration
  public getCurrentConfig(): LLMConfiguration | null {
    return this.currentConfig;
  }

  // Update configuration
  public updateConfig(config: Partial<LLMConfiguration>): boolean {
    // If no current config, create a new one
    if (!this.currentConfig) {
      if (!config.provider) {
        throw new Error('Provider must be specified when setting initial configuration');
      }
      this.currentConfig = {
        ...getDefaultConfigForProvider(config.provider),
        ...config
      } as LLMConfiguration;
    } else {
      // Merge new config with existing
      this.currentConfig = {
        ...this.currentConfig,
        ...config
      };
    }

    // Validate the updated configuration
    if (!validateLLMConfig(this.currentConfig)) {
      console.warn('Invalid LLM configuration');
      return false;
    }

    // Save to storage
    this.saveConfigToStorage();
    return true;
  }

  // Reset to default configuration for a provider
  public resetToDefault(provider: LLMProvider): void {
    const defaultConfig = getDefaultConfigForProvider(provider);
    this.currentConfig = {
      ...defaultConfig,
      apiKey: this.currentConfig?.apiKey || ''
    } as LLMConfiguration;

    this.saveConfigToStorage();
  }

  // Get configuration for a specific provider
  public getProviderConfig(provider: LLMProvider): Partial<BaseLLMConfig> | null {
    if (this.currentConfig?.provider === provider) {
      return this.currentConfig;
    }
    return null;
  }

  // List available providers (could be expanded to check actual API key availability)
  public listAvailableProviders(): LLMProvider[] {
    return Object.values(LLMProvider);
  }

  // Specific provider configuration methods
  public setOpenAIConfig(config: Partial<OpenAIConfig>): boolean {
    return this.updateConfig({
      provider: LLMProvider.OPENAI,
      ...config
    });
  }

  public setAnthropicConfig(config: Partial<AnthropicConfig>): boolean {
    return this.updateConfig({
      provider: LLMProvider.ANTHROPIC,
      ...config
    });
  }

  public setGoogleGeminiConfig(config: Partial<GoogleGeminiConfig>): boolean {
    return this.updateConfig({
      provider: LLMProvider.GOOGLE_GEMINI,
      ...config
    });
  }

  public setCustomLLMConfig(config: Partial<CustomLLMConfig>): boolean {
    return this.updateConfig({
      provider: LLMProvider.CUSTOM,
      ...config
    });
  }
}

// Export singleton instance
export const llmConfigService = LLMConfigService.getInstance();

// Optional React hook for easier usage in components
export function useLLMConfig() {
  const service = LLMConfigService.getInstance();

  return {
    currentConfig: service.getCurrentConfig(),
    updateConfig: service.updateConfig.bind(service),
    resetToDefault: service.resetToDefault.bind(service),
    getProviderConfig: service.getProviderConfig.bind(service)
  };
}
