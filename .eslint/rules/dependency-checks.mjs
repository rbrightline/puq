import ignoredDependencies from './../common/ignored-dependencies.mjs';

export default {
  files: ['**/package.json'],
  ignores,
  rules: {
    '@nx/dependency-checks': [
      'error',
      {
        ignoredFiles: [
          '{projectRoot}/eslint.config.{js,cjs,mjs}',
          '{projectRoot}/vite.config.{js,ts,mjs,mts}',
        ],
        ignoredDependencies,
      },
    ],
  },
  languageOptions: {
    parser: await import('jsonc-eslint-parser'),
  },
};
