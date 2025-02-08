import { Config } from '@easyblocks/core';

export function validateEasyblocksConfig(config: Config): Config {
  // Component Validation
  if (!config.components || config.components.length === 0) {
    throw new Error('No components defined in Easyblocks configuration');
  }

  // Template Validation
  if (!config.templates || config.templates.length === 0) {
    throw new Error('No templates defined in Easyblocks configuration');
  }

  // Root Template Validation
  const rootTemplate = config.templates.find(t => t.id === 'RootTemplate');
  if (!rootTemplate) {
    throw new Error('RootTemplate is missing from configuration');
  }

  // Locale Validation
  if (!config.locales || config.locales.length === 0) {
    throw new Error('No locales defined in Easyblocks configuration');
  }

  // Breakpoints Validation
  if (!config.breakpoints || config.breakpoints.length === 0) {
    throw new Error('No breakpoints defined in Easyblocks configuration');
  }

  // Root Section Validation
  const rootSection = config.components.find(c => c.id === 'RootSection');
  if (!rootSection) {
    throw new Error('RootSection component is missing from configuration');
  }

  // Additional Comprehensive Checks
  const requiredComponentIds = ['RootSection', 'Heading', 'Button', 'Section', 'OfferingCard'];
  requiredComponentIds.forEach(id => {
    const component = config.components.find(c => c.id === id);
    if (!component) {
      throw new Error(`Required component '${id}' is missing from configuration`);
    }
  });

  return config;
}

export function getDefaultEasyblocksConfig(): Config {
  return {
    components: [],
    templates: [],
    themes: {},
    breakpoints: [],
    locales: [{ code: 'en', name: 'English', default: true }],
    dataSources: {}
  };
}

export function determineLocale(config: Config): string {
  const defaultLocale = config.locales.find(locale => locale.default)?.code;
  return defaultLocale || 'en';
}
