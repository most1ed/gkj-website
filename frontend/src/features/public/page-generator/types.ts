import React from 'react';

export interface PageSection {
  id: string;
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  details: string[];
}

export interface PageTemplate {
  title: string;
  metaTitle: string;
  metaDescription: string;
  sections: PageSection[];
  lastUpdated?: string;
  version?: string;
}

export enum PageTemplateType {
  EXPANDABLE_SECTIONS = 'expandable_sections',
  STANDARD_TEXT = 'standard_text',
  TWO_COLUMN = 'two_column',
  TIMELINE = 'timeline'
}
