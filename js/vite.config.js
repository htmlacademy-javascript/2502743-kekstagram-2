import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000
    }
  },
  optimizeDeps: {
    exclude: ['pristinejs'] // Исключите проблемные зависимости
  }
});
