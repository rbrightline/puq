/* eslint-disable @typescript-eslint/no-explicit-any */

import { throwInvalidObjectError } from '@puq/error';

/**
 * Extracts the enumerable key-value pairs of an object as a typed array of tuples.
 * @param instance - The object to extract entries from.
 * @returns An array of `[key, value]` tuples, where `key` is a string and `value` is the corresponding value from `instance`.
 */
export function entries<T extends Record<any, any>>(
  instance: T,
): Array<[key: string, value: T[keyof T]]> {
  if (typeof instance !== 'object' || Array.isArray(instance))
    throwInvalidObjectError();
  return Object.entries(instance) as Array<[key: string, value: T[keyof T]]>;
}
