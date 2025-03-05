import type { CommonOptions } from './common.js';
/**
 * BigInteger property options
 */
export type __BigIntegerOptions = {
  type: 'bigint';
};

/**
 * BigInteger property options with {@link CommonOptions}
 */
export type BigIntegerOptions = Readonly<
  CommonOptions<bigint> & __BigIntegerOptions
>;
