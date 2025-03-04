import { isDefined } from './is-defined.js';
import { isNotDefined } from './is-not-defined.js';

/**
 * Check the value is not empty string, array, object, undefined, or null
 * @param value any value
 * @returns boolean
 */
export function notEmpty<T>(value: T | undefined | null): value is T {
  if (isNotDefined(value)) return false;

  const type = typeof value;

  switch (type) {
    case 'string':
      return (value as string).trim().length > 0;
    case 'number':
      return !isNaN(value as number);
    case 'bigint':
      return true;

    case 'object': {
      if (Array.isArray(value)) {
        return value.length > 0 && value.some((e) => isDefined(e));
      } else {
        return (
          Object.keys(value as object).length > 0 &&
          Object.values(value as object).some((e) => isDefined(e))
        );
      }
    }
    case 'boolean':
    case 'symbol':
    case 'function':
      return true;

    default:
      return false;
  }
}
