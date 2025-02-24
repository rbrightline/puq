/**
 * Check the value is undefined.
 * @param value T | null| undefined
 * @returns boolean
 */
export function udef<T>(value: T | null | undefined): value is undefined {
  return value == undefined;
}
