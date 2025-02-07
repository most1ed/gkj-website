'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { LLMProvider, ProviderModels } from '../types/llm-config';
import { useLLMConfigStore } from '../services/llmConfigService';

export default function LLMConfigurationSection() {
  const { 
    currentConfig, 
    isLoading, 
    error,
    fetchConfig,
    setLLMConfig,
    resetToDefault,
    validateApiKey 
  } = useLLMConfigStore();

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleProviderChange = async (provider: LLMProvider) => {
    try {
      await resetToDefault(provider);
    } catch (err) {
      console.error('Error changing provider:', err);
    }
  };

  const handleApiKeyChange = async (apiKey: string) => {
    try {
      if (apiKey.length >= 10) {
        const isValid = await validateApiKey(currentConfig?.config.provider || LLMProvider.OPENAI, apiKey);
        if (isValid) {
          await setLLMConfig({ apiKey });
        }
      }
    } catch (err) {
      console.error('Error updating API key:', err);
    }
  };

  const handleModelChange = async (model: string) => {
    try {
      await setLLMConfig({ model });
    } catch (err) {
      console.error('Error changing model:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Configuration</CardTitle>
        <CardDescription>
          Configure your AI provider settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select
              value={currentConfig?.config.provider}
              onValueChange={(value) => handleProviderChange(value as LLMProvider)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(LLMProvider).map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>API Key</Label>
            <Input
              type="password"
              placeholder="Enter your API key"
              value={currentConfig?.config.apiKey || ''}
              onChange={(e) => handleApiKeyChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Model</Label>
            <Select
              value={currentConfig?.config.model}
              onValueChange={handleModelChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {currentConfig?.config.provider &&
                  ProviderModels[currentConfig.config.provider].map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Temperature</Label>
            <Input
              type="number"
              min={0}
              max={1}
              step={0.1}
              value={currentConfig?.config.temperature || 0.7}
              onChange={async (e) => {
                try {
                  await setLLMConfig({ temperature: parseFloat(e.target.value) });
                } catch (err) {
                  console.error('Error updating temperature:', err);
                }
              }}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Lower values (0-0.3) for focused responses, higher values (0.7-1) for creative responses
            </p>
          </div>

          <div className="space-y-2">
            <Label>Max Tokens</Label>
            <Input
              type="number"
              min={10}
              max={4096}
              value={currentConfig?.config.maxTokens || 1000}
              onChange={async (e) => {
                try {
                  await setLLMConfig({ maxTokens: parseInt(e.target.value) });
                } catch (err) {
                  console.error('Error updating max tokens:', err);
                }
              }}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Maximum number of tokens to generate in responses (10-4096)
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable AI Features</Label>
              <p className="text-sm text-muted-foreground">
                Toggle AI functionality across the application
              </p>
            </div>
            <Switch
              checked={currentConfig?.config.enabled}
              onCheckedChange={async (checked) => {
                try {
                  await setLLMConfig({ enabled: checked });
                } catch (err) {
                  console.error('Error toggling AI features:', err);
                }
              }}
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            onClick={() => resetToDefault()}
            disabled={isLoading}
          >
            Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
