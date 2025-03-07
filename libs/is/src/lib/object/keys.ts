import type { Keys, Type } from '@puq/type';
import type { EnumeratorParam } from './enumerator-param.js';
import { isConstructor } from './is-constructor.js';

/**
 * Extract the keys of `object`, `array`
 * @param value - one of `object`, `array`
 * @returns the keys of the value such as [`some`, `other`]
 */
export function keys<T extends EnumeratorParam>(value: T): Keys<T> {
  if (isConstructor(value)) {
    return Object.keys(new (value as Type)()) as Keys<T>;
  }
  return Object.keys(value) as Keys<T>;
}
