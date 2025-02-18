import { CommonOptions } from './common.js';

export type __BooleanOptions = {
  type: 'boolean';
  default: boolean;
  example: boolean;
  examples: boolean[];
  isBooleanString?: boolean;
};

export type BooleanOptions = CommonOptions & __BooleanOptions;
