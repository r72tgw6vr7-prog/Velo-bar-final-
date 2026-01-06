import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__tests__/vitest-setup.ts'],
    exclude: ['node_modules', 'dist', 'tests/p0/**', 'playwright/**', 'e2e/**', '**/*.e2e.*'],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/foundation': path.resolve(__dirname, './src/foundation'),
      '@core': path.resolve(__dirname, './src/core'),
      scheduler: path.resolve(__dirname, './node_modules/scheduler/index.js'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    dedupe: ['react', 'react-dom', 'scheduler'],
  },
});
