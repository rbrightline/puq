import { CommonOptions } from './common.js';

export type __BigIntegerOptions = {
  type: 'bigint';
  minimum?: BigInt;
  maximum?: BigInt;
  enum?: BigInt[];
  notIn?: BigInt[];
};

export type BigIntegerOptions = Readonly<
  CommonOptions<BigInt> & __BigIntegerOptions
>;
