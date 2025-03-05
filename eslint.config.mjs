import nx from '@nx/eslint-plugin';
import consistentTypeImports from './.eslint/rules/consistent-type-imports.mjs';
import dependencyChecks from './.eslint/rules/dependency-checks.mjs';
import enforceModuleBoundaries from './.eslint/rules/enforce-module-boundaries.mjs';
import noShadow from './.eslint/rules/no-shadow.mjs';
import spellChecker from './.eslint/rules/spell-checker.mjs';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  consistentTypeImports,
  dependencyChecks,
  enforceModuleBoundaries,
  noShadow,
  spellChecker,
];
