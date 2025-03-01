import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  // Dependency check
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs}',
            '{projectRoot}/vite.config.{js,ts,mjs,mts}',
          ],
          ignoredDependencies: ['@swc/helpers'],
        },
      ],
    },

    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },

  // Boundries
  {
    files: ['libs/**/*.ts', 'services/**/*.ts'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },

  // Make use `import type` is used for type imports
  {
    files: ['libs/**/*.ts', 'services/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],
    },
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
    },
  },

  // Ignore patterns
  {
    ignores: [
      '**/eslint.config.mjs',
      '**/dist',
      '**/node_modules',
      '**/*.md',
      '**/public',
      '**/bin',
      '**/tmp',
      '**/vite.config.ts',
    ],
  },
];
