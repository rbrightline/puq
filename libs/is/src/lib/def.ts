/**
 * Check the value is defined.
 * @param value T | null| undefined
 * @returns boolean
 */
export function def<T>(value: T | null | undefined): value is T {
  return value != undefined;
}
