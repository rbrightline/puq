/**
 * Checks if the given value is neither `undefined` nor `null`.
 * Acts as a type guard to ensure `value` is of type `T`.
 *
 * @param value - The value to check.
 * @returns - boolean
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value != undefined;
}
