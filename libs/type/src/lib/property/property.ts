import { ArrayOptions } from './array.js';
import { BooleanOptions } from './boolean.js';
import { IntegerOptions } from './integer.js';
import { NumberOptions } from './number.js';
import { ObjectOptions } from './object.js';
import { StringOptions } from './string.js';

export type __PropertyOptions<T = any> =
  | StringOptions
  | NumberOptions
  | IntegerOptions
  | BooleanOptions
  | ObjectOptions
  | ArrayOptions<T>;

export type PropertyOptions = __PropertyOptions<
  __PropertyOptions<__PropertyOptions>
>;
