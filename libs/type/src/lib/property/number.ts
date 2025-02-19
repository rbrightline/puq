import { CommonNumberOptions } from './common-number.js';
import { CommonOptions } from './common.js';
import { NumberFormat } from './number-format.js';

export type __NumberOptions = {
  type: 'number';

  /**
   * Maximum allowed decimals
   */
  maxDecimals?: number;

  /**
   * Special number format
   */
  numberFormat?: NumberFormat;
};

export type NumberOptions = Readonly<
  CommonOptions<number> & __NumberOptions & CommonNumberOptions
>;
