import { defineConfig } from 'vitest/config';
// In your own vitest-setup.js (or any other name)

// In vitest.config.js add (if you haven't already)

console.log('vitest config');

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      all: true,
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: 'apps/ui/src/setup.ts',
  },
});
