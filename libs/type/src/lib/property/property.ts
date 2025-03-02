/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ArrayOptions } from './array.js';
import type { BigIntegerOptions } from './big-integer.js';
import type { BooleanOptions } from './boolean.js';
import type { DateOptions } from './date.js';
import type { IntegerOptions } from './integer.js';
import type { NumberOptions } from './number.js';
import type { ObjectOptions } from './object.js';
import type { StringOptions } from './string.js';

export type __PropertyOptions<T = any> =
  | StringOptions
  | NumberOptions
  | IntegerOptions
  | BigIntegerOptions
  | BooleanOptions
  | ObjectOptions
  | DateOptions
  | ArrayOptions<T>;

export type PropertyOptions = Readonly<
  __PropertyOptions<__PropertyOptions<__PropertyOptions>>
>;
