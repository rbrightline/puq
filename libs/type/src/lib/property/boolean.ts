import { CommonOptions } from './common.js';

export type __BooleanOptions = {
  type: 'boolean';
};

export type BooleanOptions = Readonly<
  CommonOptions<boolean> & __BooleanOptions
>;
