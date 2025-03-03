/**
 * Checks if the given value is either `null` or `undefined`
 *
 * @param value  unkown value
 * @returns {boolean}
 */
export function udef(value: unknown): value is undefined | null {
  return value == undefined;
}
