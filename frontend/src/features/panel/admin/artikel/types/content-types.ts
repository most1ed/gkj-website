export type ContentTheme = 
  | 'spiritual' 
  | 'community' 
  | 'theological' 
  | 'social_impact'
  | 'pastoral_care'
  | 'youth_engagement';

export type TargetAudience = 
  | 'youth' 
  | 'adults' 
  | 'seniors' 
  | 'families'
  | 'professionals'
  | 'students';

export type ContentTone = 
  | 'inspirational' 
  | 'academic' 
  | 'conversational' 
  | 'pastoral'
  | 'empathetic'
  | 'motivational';

export type ContentLength = 
  | 'short' 
  | 'medium' 
  | 'long'
  | 'extended';

export interface AIContentConfig {
  theme: ContentTheme;
  targetAudience: TargetAudience;
  tone: ContentTone;
  length: ContentLength;
  tags: string[];
}

export interface ArticleMetadata {
  id: string;
  title: string;
  content: string;
  summary: string;
  aiConfidence: number;
  generatedAt: Date;
  tags: string[];
  status: 'draft' | 'review' | 'published' | 'archived';
}

export interface ContentPlan {
  primaryTopic: string;
  subtopics: string[];
  keyMessages: string[];
  recommendedPublishTime: Date;
  suggestedChannels: SocialMediaChannel[];
}

export interface SocialMediaChannel {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'whatsapp';
  optimizedContent?: string;
  scheduledTime?: Date;
}

export const CONTENT_THEMES: ContentTheme[] = [
  'spiritual', 
  'community', 
  'theological', 
  'social_impact', 
  'pastoral_care', 
  'youth_engagement'
];

export const TARGET_AUDIENCES: TargetAudience[] = [
  'youth', 
  'adults', 
  'seniors', 
  'families', 
  'professionals', 
  'students'
];

export const CONTENT_TONES: ContentTone[] = [
  'inspirational', 
  'academic', 
  'conversational', 
  'pastoral', 
  'empathetic', 
  'motivational'
];

export const CONTENT_LENGTHS: ContentLength[] = [
  'short', 
  'medium', 
  'long', 
  'extended'
];

export const DEFAULT_AI_CONFIG: AIContentConfig = {
  theme: 'spiritual',
  targetAudience: 'youth',
  tone: 'inspirational',
  length: 'medium',
  tags: ['faith', 'community', 'inspiration']
};
