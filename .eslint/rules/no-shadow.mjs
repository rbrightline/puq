import ignores from '../common/ignores.mjs';

export default {
  files: ['**/*.ts'],
  ignores,
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
  },
};
