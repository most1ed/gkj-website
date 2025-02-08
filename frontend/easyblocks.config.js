const { easyblocksConfig } = require('./src/features/panel/pagebuilder/easyblocks.config');

module.exports = {
  ...easyblocksConfig,
  output: {
    path: './src/features/panel/pagebuilder/generated',
    filename: 'easyblocks-generated.ts'
  },
  // Additional generator configuration
  generator: {
    typescript: true,
    react: true
  }
};
