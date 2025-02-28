/**
 * Checks if the given value is either `null` or `undefined`
 *
 * @param value {T} - The value to check.
 * @returns {boolean}
 */
export function udef<T>(
  value: T | undefined | null
): value is undefined | null {
  return value == undefined;
}
