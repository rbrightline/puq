import { CommonOptions } from './common.js';

export type __BigIntegerOptions = {
  type: 'bigint';
};

export type BigIntegerOptions = Readonly<
  CommonOptions<bigint> & __BigIntegerOptions
>;
