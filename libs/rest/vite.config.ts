import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: `../../node_modules/.vite/libs/rest`,
  plugins: [],
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8',
    },
  },
});
