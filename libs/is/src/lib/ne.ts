import { def } from './def.js';

/**
 * Check the value is not empty string, array, object, undefined, or null
 * @param value
 * @returns
 */
export function ne<T>(value: T | undefined | null): value is T {
  if (def(value)) {
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
            Object.keys(value as Record<any, any>).length > 0 &&
            Object.values(value as Record<any, any>).some((e) => def(e))
          );
        }
      }
      case 'boolean':
      case 'symbol':
      case 'function':
        return true;
    }
  }

  return false;
}
