import { CommonOptions } from './common.js';
import { NumberFormat } from './number-format.js';

export type __NumberOptions = {
  type: 'number';
  minimum?: number;
  maximum?: number;
  numberFormat?: NumberFormat;
  enum?: number[];
  notIn?: number[];
  default?: number;
  example?: number;
  examples?: number[];
  isNumberString?: boolean;
};

export type NumberOptions = CommonOptions & __NumberOptions;
