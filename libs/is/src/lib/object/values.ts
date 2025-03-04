import type { SomeRecord, Some } from '@puq/type';
import { throwInvalidObjectError } from '@puq/error';

/**
 * Extract the values of an object
 * @template - {@link T}  the object type
 * @template - {@link V}  the value of each property
 * @param instance - the object value to extract the values from
 * @returns Array of values of the object
 */
export function values<T extends SomeRecord, V = unknown>(
  instance: T,
): Some<V>[] {
  if (typeof instance !== 'object' || Array.isArray(instance))
    throwInvalidObjectError();

  return Object.values(instance);
}
