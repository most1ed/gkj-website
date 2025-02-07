import OpenAI from 'openai';
import { Component, ComponentType } from '../types/page';

export interface AIGenerationOptions {
  prompt: string;
  componentTypes?: ComponentType[];
  complexity?: 'simple' | 'moderate' | 'complex';
}

export class AIGenerationService {
  private openai: OpenAI;

  constructor() {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    this.openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  async generatePageComponents(options: AIGenerationOptions): Promise<Component[]> {
    try {
      const systemPrompt = this.constructSystemPrompt(options);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-turbo",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: options.prompt
          }
        ],
        max_tokens: 1000
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No content generated');
      }

      return this.parseAIResponse(content);
    } catch (error) {
      console.error('AI Generation Error:', error);
      throw error;
    }
  }

  private constructSystemPrompt(options: AIGenerationOptions): string {
    const componentTypeHint = options.componentTypes 
      ? `Focus on generating components of these types: ${options.componentTypes.join(', ')}. ` 
      : '';
    
    const complexityHint = options.complexity 
      ? `Complexity level: ${options.complexity}. ` 
      : '';

    return `
      You are an AI assistant for generating webpage components. 
      ${componentTypeHint}
      ${complexityHint}
      
      Generate a JSON array of components with the following structure:
      [
        {
          "id": "unique-uuid",
          "type": "component-type",
          "content": {
            "text": "Component text content",
            "attributes": {}
          },
          "styles": {
            "tailwind": ["list", "of", "classes"]
          },
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 50
          }
        }
      ]
    `;
  }

  private parseAIResponse(content: string): Component[] {
    try {
      const parsedContent = JSON.parse(content);
      
      // Validate the parsed content
      if (!Array.isArray(parsedContent)) {
        throw new Error('Invalid AI response format');
      }

      return parsedContent.map(component => ({
        id: component.id || crypto.randomUUID(),
        type: component.type || ComponentType.TEXT,
        content: component.content || {},
        styles: component.styles || {},
        position: component.position || { x: 0, y: 0, width: 100, height: 50 }
      }));
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return [];
    }
  }

  // Singleton pattern
  private static instance: AIGenerationService;
  public static getInstance(): AIGenerationService {
    if (!AIGenerationService.instance) {
      AIGenerationService.instance = new AIGenerationService();
    }
    return AIGenerationService.instance;
  }
}
