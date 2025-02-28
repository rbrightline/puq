import { def } from './def.js';
import { udef } from './udef.js';

/**
 * Check the value is not empty string, array, object, undefined, or null
 * @param value
 * @returns
 */
export function ne<T>(value: T | undefined | null): value is T {
  if (udef(value)) return false;

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
        return value.length > 0 && value.some((e) => def(e));
      } else {
        return (
          Object.keys(value as any).length > 0 &&
          Object.values(value as any).some((e) => def(e))
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
