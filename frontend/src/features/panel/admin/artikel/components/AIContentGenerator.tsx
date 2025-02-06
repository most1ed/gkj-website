import React, { useState, useCallback } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Slider 
} from "@/components/ui/slider";
import { 
  Badge 
} from "@/components/ui/badge";
import { 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

import { 
  AIContentConfig, 
  ArticleMetadata, 
  ContentPlan,
  CONTENT_THEMES,
  TARGET_AUDIENCES,
  CONTENT_TONES,
  CONTENT_LENGTHS,
  DEFAULT_AI_CONFIG
} from '../types/content-types';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

export const AIContentGenerator: React.FC = () => {
  const [config, setConfig] = useState<AIContentConfig>(DEFAULT_AI_CONFIG);
  const [generatedContent, setGeneratedContent] = useState<ArticleMetadata | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfigUpdate = useCallback((field: keyof AIContentConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Simulated AI content generation
      const mockContent: ArticleMetadata = {
        id: `article_${Date.now()}`,
        title: `Inspirasi Iman untuk Generasi Muda`,
        content: `Artikel tentang perjalanan iman dan tantangan spiritual...`,
        summary: `Sebuah refleksi mendalam tentang spiritualitas di era modern.`,
        aiConfidence: 0.85,
        generatedAt: new Date(),
        tags: config.tags,
        status: 'draft'
      };

      setGeneratedContent(mockContent);
    } catch (err) {
      setError('Gagal menghasilkan konten. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 text-primary" />
            Konfigurasi Konten AI
          </CardTitle>
          <CardDescription>
            Sesuaikan parameter untuk menghasilkan konten yang tepat
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tema Konten
            </label>
            <Select 
              value={config.theme}
              onValueChange={(value) => handleConfigUpdate('theme', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tema" />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_THEMES.map(theme => (
                  <SelectItem key={theme} value={theme}>
                    {theme.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Audience Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audiens
            </label>
            <Select 
              value={config.targetAudience}
              onValueChange={(value) => handleConfigUpdate('targetAudience', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Audiens" />
              </SelectTrigger>
              <SelectContent>
                {TARGET_AUDIENCES.map(audience => (
                  <SelectItem key={audience} value={audience}>
                    {audience.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tone Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nada Tulisan
            </label>
            <Select 
              value={config.tone}
              onValueChange={(value) => handleConfigUpdate('tone', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Nada" />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_TONES.map(tone => (
                  <SelectItem key={tone} value={tone}>
                    {tone.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Length Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Panjang Konten
            </label>
            <Select 
              value={config.length}
              onValueChange={(value) => handleConfigUpdate('length', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Panjang" />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_LENGTHS.map(length => (
                  <SelectItem key={length} value={length}>
                    {length.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerateContent} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <><RefreshCw className="mr-2 animate-spin" /> Sedang Membuat...</>
            ) : (
              <><Sparkles className="mr-2" /> Hasilkan Konten</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle2 className="mr-2 text-green-500" />
            Pratinjau Konten
          </CardTitle>
          <CardDescription>
            Konten yang dihasilkan oleh AI akan ditampilkan di sini
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generatedContent ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{generatedContent.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {generatedContent.summary}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  Kepercayaan AI: {(generatedContent.aiConfidence * 100).toFixed(0)}%
                </Badge>
                <Badge variant="outline">
                  Status: {generatedContent.status}
                </Badge>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Tag</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <AlertTriangle className="mx-auto mb-4 text-yellow-500" size={48} />
              <p>Belum ada konten yang dihasilkan</p>
              <p className="text-sm">Sesuaikan parameter dan klik "Hasilkan Konten"</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
