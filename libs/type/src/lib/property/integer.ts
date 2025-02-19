import { CommonNumberOptions } from './common-number.js';
import { CommonOptions } from './common.js';
import { IntegerFormat } from './integer-format.js';

export type __IntegerOptions = {
  type: 'integer';

  /**
   * Special integer format
   */
  integerFormat?: IntegerFormat;
};

export type IntegerOptions = Readonly<
  CommonOptions<number> & __IntegerOptions & CommonNumberOptions
>;
