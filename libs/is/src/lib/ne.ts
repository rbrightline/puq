import { def } from './def.js';

export function ne<T>(value: T | undefined | null): value is T {
  if (def(value)) {
    const type = typeof value;
    switch (type) {
      case 'string':
        return (value as string).length > 0;
      case 'number':
      case 'bigint':
        return !isNaN(value as number);

      case 'object': {
        if (Array.isArray(value)) {
          return value.length > 0 && value.every((e) => def(e));
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
