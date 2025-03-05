import eslintPluginSpellCheck from 'eslint-plugin-spellcheck';
import ignores from '../common/ignores.mjs';
import skipWords from '../common/skip-words.mjs';

export default {
  files: ['**/*.ts'],
  ignores,
  plugins: {
    spellcheck: eslintPluginSpellCheck,
  },
  rules: {
    'spellcheck/spell-checker': [
      'error',
      {
        comments: true,
        strings: true,
        identifiers: true,
        lang: 'en_US',
        skipWords,
      },
    ],
  },
};
