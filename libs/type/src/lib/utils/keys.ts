/* eslint-disable @typescript-eslint/no-explicit-any */
import { Keys } from './key-of.js';

/**
 * Extract the keys of the object
 * @param instance - the object value that the keys are extracted from
 * @returns the keys of the object as `string[]`
 */
export function keys<T extends Record<any, any>>(instance: T): Keys<T> {
  return Object.keys(instance) as Keys<T>;
}
