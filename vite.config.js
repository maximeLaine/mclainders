import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  publicDir: 'public', // Ensure public directory is correctly copied to build output
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      './WebSocket': resolve(__dirname, 'src/polyfills/WebSocket.js'),
    },
  },
  define: {
    global: 'globalThis',
  },
});
