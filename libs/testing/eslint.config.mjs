import baseConfig from '../../eslint.config.mjs';
import { createDependencyChecksRule } from '../../.eslint/rules/dependency-checks.mjs';

export default [
  ...baseConfig,
  await createDependencyChecksRule([
    'class-validator',
    'class-transformer',
    '@nestjs/testing',
    '@nestjs/typeorm',
  ]),
];
