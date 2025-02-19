import { CommonOptions } from './common.js';
import { IntegerFormat } from './integer-format.js';

export type __IntegerOptions = {
  type: 'integer';
  minimum?: number;
  maximum?: number;
  integerFormat?: IntegerFormat;
  enum?: number[];
  notIn?: number[];
};

export type IntegerOptions = Readonly<CommonOptions<number> & __IntegerOptions>;
