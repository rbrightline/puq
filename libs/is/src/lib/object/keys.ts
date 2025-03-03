import type { Keys, SomeRecord, EmptyClass } from '@puq/type';
import { throwInvalidObjectError } from '@puq/error';

/**
 * Extract the keys of `object`, `array`, or `class instance`
 * @param value - one of `object`, `array` or `class instance`
 * @returns the keys of the value such as [`some`, `other`]
 */
export function keys<T extends SomeRecord | Array<unknown> | EmptyClass>(
  value: T,
): Keys<T> {
  if (typeof value !== 'object') throwInvalidObjectError();
  return Object.keys(value) as Keys<T>;
}
