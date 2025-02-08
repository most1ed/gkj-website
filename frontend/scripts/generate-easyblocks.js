import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { easyblocksConfig } from '../src/features/panel/pagebuilder/easyblocks.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateEasyBlocksTypes() {
  const outputPath = path.resolve(__dirname, '../src/features/panel/pagebuilder/generated/easyblocks-generated.ts');
  
  const componentTypes = Object.keys(easyblocksConfig.components).map(componentName => {
    const component = easyblocksConfig.components[componentName];
    return `
export interface ${componentName}Props {
  ${component.schema?.map(prop => `
    ${prop.prop}${prop.optional ? '?' : ''}: ${getTypeScriptType(prop.type)};
  `).join('\n')}
}`;
  }).join('\n');

  const configTypes = `
export interface EasyBlocksTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  }
}

export interface EasyBlocksBreakpoint {
  name: string;
  width: number;
}
`;

  const generatedContent = `
// GENERATED FILE - DO NOT EDIT DIRECTLY
import { NoCodeComponentDefinition } from '@easyblocks/core';

${componentTypes}

${configTypes}

export const EASYBLOCKS_THEMES = ${JSON.stringify(easyblocksConfig.themes, null, 2)};
export const EASYBLOCKS_BREAKPOINTS = ${JSON.stringify(easyblocksConfig.breakpoints, null, 2)};
`;

  // Ensure directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  // Write generated types
  fs.writeFileSync(outputPath, generatedContent);
  
  console.log(`✅ Easyblocks types generated at ${outputPath}`);
}

function getTypeScriptType(type) {
  const typeMap = {
    'text': 'string',
    'number': 'number',
    'boolean': 'boolean',
    'color': 'string',
    'select': 'string',
    'array': 'any[]',
    'object': 'Record<string, any>'
  };
  return typeMap[type] || 'any';
}

generateEasyBlocksTypes();
