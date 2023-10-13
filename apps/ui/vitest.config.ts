import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      all: true,
      // enabled: true,
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['apps/ui/src/tests/setupTests.ts'],
  },
});
