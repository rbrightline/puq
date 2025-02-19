import { CommonOptions } from './common.js';
import { NumberFormat } from './number-format.js';

export type __NumberOptions = {
  type: 'number';
  minimum?: number;
  maximum?: number;
  maxDecimals?: number;
  numberFormat?: NumberFormat;
  enum?: number[];
  notIn?: number[];
};

export type NumberOptions = Readonly<CommonOptions<number> & __NumberOptions>;
