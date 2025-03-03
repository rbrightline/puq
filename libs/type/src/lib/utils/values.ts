/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Extract the values of an object
 * @param instance - the object value to extract the values from
 * @returns Array of values of the object
 */
export function values<T extends Record<any, any>>(instance: T): any[] {
  return Object.values(instance);
}
