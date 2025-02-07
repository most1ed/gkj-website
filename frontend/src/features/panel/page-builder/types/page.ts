import { z } from 'zod';

// Enum for Page Status
export enum PageStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

// Zod Schema for Component
export const ComponentSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  content: z.record(z.any()),
  styles: z.record(z.string()),
  position: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number()
  }).optional()
});

// Zod Schema for Page Configuration
export const PageConfigurationSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  status: z.nativeEnum(PageStatus),
  components: z.array(ComponentSchema),
  metadata: z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
    author: z.string()
  }),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional()
  }).optional()
});

// TypeScript Types
export type Component = z.infer<typeof ComponentSchema>;
export type PageConfiguration = z.infer<typeof PageConfigurationSchema>;

// Utility function to create a new page
export function createNewPage(author: string): PageConfiguration {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    title: 'Untitled Page',
    status: PageStatus.DRAFT,
    components: [],
    metadata: {
      createdAt: now,
      updatedAt: now,
      author
    }
  };
}

// Component Type Definitions
export enum ComponentType {
  TEXT = 'text',
  IMAGE = 'image',
  BUTTON = 'button',
  CONTAINER = 'container',
  FORM = 'form',
  CUSTOM = 'custom'
}
