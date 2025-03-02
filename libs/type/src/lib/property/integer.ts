import type { CommonNumberOptions } from './common-number.js';
import type { CommonOptions } from './common.js';
import type { IntegerFormat } from './integer-format.js';

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
