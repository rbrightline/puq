import nx from '@nx/eslint-plugin';
import spellcheck from 'eslint-plugin-spellcheck'; // Ensure this is installed

const commonKeywords = [
  'nullable',
  'uniques',
  'dto',
  'api',
  'apis',
  'yaml',
  'json',
  'enums',
];
const projectKeywords = [
  'nx',
  'typescript',
  'eslint',
  'vite',
  'puq',
  'typeorm',
  'sqlite',
  'better-sqlite3',
  'varchar',
  'jsonb',
  'increment',
  'decrement',
  'signup',
  'otp',
  'pbkdf2',
  'decrypted',
  'Decipheriv',
  'Decrypt',
  'Cipheriv',
  'aes',
  'cbc',
  'utf8',
];
const tsKeywords = [
  'nx',
  'typescript',
  'eslint',
  'vite',
  // Add TypeScript keywords
  'interface',
  'type',
  'class',
  'function',
  'const',
  'let',
  'var',
  'enum',
  'export',
  'import',
  'default',
  'extends',
  'implements',
  'public',
  'private',
  'protected',
  'static',
  'abstract',
  'async',
  'await',
  'return',
  'void',
  'null',
  'undefined',
  'boolean',
  'number',
  'string',
  'any',
  'unknown',
  'never',
  'as',
  'is',
  'keyof',
  'typeof',
  'namespace',
  'module',
  'declare',
  'readonly',
  'override',
];

export default [
  // Ignore patterns
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/public',
      '**/bin',
      '**/tmp',
      '**/eslint.config.mjs',
      '**/vite.config.ts',
      '**/*.spec.ts',
      '**/*.md',
      '**/*.js',
    ],
  },

  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  {
    files: ['**/package.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs}',
            '{projectRoot}/vite.config.{js,ts,mjs,mts}',
          ],
          ignoredDependencies: ['@puq/type', '@puq/model'],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },

  // Common rules
  {
    files: ['**/*.ts'],
    plugins: {
      spellcheck: spellcheck, // Register plugin here
    },
    rules: {
      // Spell check
      'spellcheck/spell-checker': [
        'error',
        {
          comments: true,
          strings: true,
          identifiers: true,
          lang: 'en_US',
          skipWords: [...commonKeywords, ...projectKeywords, ...tsKeywords],
        },
      ],

      // No shadow variable
      '@typescript-eslint/no-shadow': ['error'],

      // Type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],

      // Module boundaries
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
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
    },
  },
];
