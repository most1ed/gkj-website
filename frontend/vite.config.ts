import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components')
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true, // Listen on all addresses
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
      'zustand'
    ],
    exclude: ['@vitejs/plugin-react']
  },
  build: {
    target: 'es2020'
  }
})
