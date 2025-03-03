/* eslint-disable @typescript-eslint/no-explicit-any */
import { throwInvalidObjectError } from '@puq/error';
import type { Keys } from '@puq/type';

/**
 * Extract the keys of the object
 * @param instance - the object value that the keys are extracted from
 * @returns the keys of the object as `string[]`
 */
export function keys<T extends Record<any, any>>(instance: T): Keys<T> {
  if (typeof instance !== 'object' || Array.isArray(instance))
    throwInvalidObjectError();
  return Object.keys(instance) as Keys<T>;
}
