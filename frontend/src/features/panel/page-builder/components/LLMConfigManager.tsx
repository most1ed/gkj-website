import React, { useState, useEffect } from 'react';
import { 
  LLMProvider, 
  OpenAIModel, 
  AnthropicModel, 
  GoogleGeminiModel 
} from '../types/llm-config';
import { llmConfigService } from '../services/llmConfigService';

export const LLMConfigManager: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider>(LLMProvider.OPENAI);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('');
  const [temperature, setTemperature] = useState(0.7);

  // Provider-specific model options
  const modelOptions = {
    [LLMProvider.OPENAI]: Object.values(OpenAIModel),
    [LLMProvider.ANTHROPIC]: Object.values(AnthropicModel),
    [LLMProvider.GOOGLE_GEMINI]: Object.values(GoogleGeminiModel),
    [LLMProvider.CUSTOM]: ['Custom Model']
  };

  useEffect(() => {
    const currentConfig = llmConfigService.getCurrentConfig();
    if (currentConfig) {
      setSelectedProvider(currentConfig.provider);
      setApiKey(currentConfig.apiKey);
      setModel(currentConfig.model);
      setTemperature(currentConfig.temperature || 0.7);
    }
  }, []);

  const handleSaveConfig = () => {
    llmConfigService.updateConfig({
      provider: selectedProvider,
      apiKey,
      model,
      temperature
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">LLM Configuration</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Provider</label>
        <select 
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value as LLMProvider)}
          className="w-full p-2 border rounded"
        >
          {Object.values(LLMProvider).map(provider => (
            <option key={provider} value={provider}>
              {provider.charAt(0).toUpperCase() + provider.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">API Key</label>
        <input 
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter API Key"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Model</label>
        <select 
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {modelOptions[selectedProvider].map(modelOption => (
            <option key={modelOption} value={modelOption}>
              {modelOption}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Temperature ({temperature})
        </label>
        <input 
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <button 
        onClick={handleSaveConfig}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Save Configuration
      </button>
    </div>
  );
};
