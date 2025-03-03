import type { SomeRecord, None } from '@puq/type';
import { throwInvalidObjectError } from '@puq/error';

/**
 * Extract the values of an object
 * @param instance - the object value to extract the values from
 * @returns Array of values of the object
 */
export function values<T extends SomeRecord>(instance: T): None[] {
  if (typeof instance !== 'object' || Array.isArray(instance))
    throwInvalidObjectError();

  return Object.values(instance);
}
