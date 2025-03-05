import ignores from '../common/ignores.mjs';

export default {
  files: ['**/*.ts'],
  ignores,
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
};
