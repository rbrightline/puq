import type { Some } from '@puq/type';

/**
 * Checks if the given value is either `null` or `undefined`
 * @param value - {@link Some}
 * @returns - {@link boolean}
 */
export function isNotDefined(value: Some): value is undefined | null {
  return value == undefined;
}
