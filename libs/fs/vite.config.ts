import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/fs',
  plugins: [],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  test: {
    watch: false,
    globals: true,
    maxConcurrency: 0,
    environment: 'node',
    include: ['test/**/*.{spec,test}.ts'],
    reporters: ['default'],
    env: {
      DEBUG_MODE: 'true',
    },
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8',
    },
  },
});
