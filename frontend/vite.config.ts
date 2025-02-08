import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite()
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
      '@easyblocks/editor': path.resolve(__dirname, '../../Repositories/easyblocks/packages/editor/src'),
      '@easyblocks/core': path.resolve(__dirname, '../../Repositories/easyblocks/packages/core/src'),
      '@easyblocks/design-system': path.resolve(__dirname, '../../Repositories/easyblocks/packages/design-system/src'),
      '@easyblocks/utils': path.resolve(__dirname, '../../Repositories/easyblocks/packages/utils/src'),
      '@easyblocks/reduce-css-calc': path.resolve(__dirname, '../../Repositories/easyblocks/packages/reduce-css-calc/src'),
      '@emotion/is-prop-valid': path.resolve(__dirname, 'node_modules/@emotion/is-prop-valid'),
      'styled-components': path.resolve(__dirname, 'node_modules/styled-components'),
      'zod': path.resolve(__dirname, 'node_modules/zod'),
      'slate': path.resolve(__dirname, 'node_modules/slate'),
      'slate-react': path.resolve(__dirname, 'node_modules/slate-react'),
      'lodash/debounce': path.resolve(__dirname, 'node_modules/lodash/debounce'),
      'lodash/throttle': path.resolve(__dirname, 'node_modules/lodash/throttle'),
      'lodash.throttle': path.resolve(__dirname, 'node_modules/lodash.throttle'),
      '@dnd-kit/core': path.resolve(__dirname, 'node_modules/@dnd-kit/core'),
      '@dnd-kit/sortable': path.resolve(__dirname, 'node_modules/@dnd-kit/sortable'),
      '@radix-ui/react-tabs': path.resolve(__dirname, 'node_modules/@radix-ui/react-tabs'),
      '@radix-ui/react-dropdown-menu': path.resolve(__dirname, 'node_modules/@radix-ui/react-dropdown-menu'),
      '@radix-ui/react-icons': path.resolve(__dirname, 'node_modules/@radix-ui/react-icons'),
      '@radix-ui/react-tooltip': path.resolve(__dirname, 'node_modules/@radix-ui/react-tooltip'),
      '@radix-ui/react-select': path.resolve(__dirname, 'node_modules/@radix-ui/react-select'),
      '@radix-ui/react-toggle-group': path.resolve(__dirname, 'node_modules/@radix-ui/react-toggle-group'),
      'postcss-value-parser': path.resolve(__dirname, 'node_modules/postcss-value-parser'),
      'react-hot-toast': path.resolve(__dirname, 'node_modules/react-hot-toast'),
      'react-select': path.resolve(__dirname, 'node_modules/react-select'),
      'js-xxhash': path.resolve(__dirname, 'node_modules/js-xxhash'),
      '@stitches/core': path.resolve(__dirname, 'node_modules/@stitches/core'),
      'react-modal': path.resolve(__dirname, 'node_modules/react-modal'),
      'react-textarea-autosize': path.resolve(__dirname, 'node_modules/react-textarea-autosize'),
      'final-form': path.resolve(__dirname, 'node_modules/final-form'),
      'final-form-arrays': path.resolve(__dirname, 'node_modules/final-form-arrays'),
      '@react-aria/tooltip': path.resolve(__dirname, 'node_modules/@react-aria/tooltip'),
      'react-popper': path.resolve(__dirname, 'node_modules/react-popper'),
      '@radix-ui/react-radio-group': path.resolve(__dirname, 'node_modules/@radix-ui/react-radio-group'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true, // Listen on all addresses
    open: true,
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'date-fns', 
      '@dnd-kit/core', 
      '@dnd-kit/sortable', 
      '@dnd-kit/utilities', 
      'react-grid-layout', 
      'react-resizable',
      'zustand',
      '@easyblocks/core',
      '@easyblocks/editor',
      '@easyblocks/design-system',
      '@easyblocks/utils',
      '@easyblocks/reduce-css-calc',
      'styled-components',
      'zod',
      'slate',
      'slate-react',
      'lodash/debounce',
      'lodash/throttle',
      'lodash.throttle',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      '@radix-ui/react-tabs',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-icons',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-select',
      '@radix-ui/react-toggle-group',
      'postcss-value-parser',
      'react-hot-toast',
      'react-select',
      'js-xxhash',
      '@stitches/core',
      'react-modal',
      'react-textarea-autosize',
      'final-form',
      'final-form-arrays',
      '@react-aria/tooltip',
      'react-popper',
      '@radix-ui/react-radio-group'
    ],
    exclude: ['@vitejs/plugin-react']
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  define: {
    'import.meta.env.ROUTER_FUTURE_FLAGS': JSON.stringify({
      v7_startTransition: true
    })
  }
})
