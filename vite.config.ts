import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  base: '/SafeGuardianWebsite/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/js/main.ts'),
        style: resolve(__dirname, 'public/css/style.css'),
      },
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name].[hash].[ext]';
          }
          return 'assets/[name].[hash].[ext]';
        }
      }
    },
    copyPublicDir: true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/': 'http://localhost:3000'
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components')
    }
  }
});