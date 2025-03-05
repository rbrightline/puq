import type { Keys } from '@puq/type';
import type { EnumaratorParam } from './enumarator-param.js';
import { throwInvalidObjectError } from '@puq/error';

/**
 * Extract the keys of `object`, `array`
 * @param value - one of `object`, `array`
 * @returns the keys of the value such as [`some`, `other`]
 */
export function keys<T extends EnumaratorParam>(value: T): Keys<T> {
  if (typeof value !== 'object') throwInvalidObjectError();
  return Object.keys(value) as Keys<T>;
}
