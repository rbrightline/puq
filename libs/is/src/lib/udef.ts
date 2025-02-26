/**
 * Checks if the given value is `null` or `undefined`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is `null` or `undefined`, otherwise `false`.
 */
export function udef<T>(value: T | null | undefined): boolean {
  return value == undefined;
}
