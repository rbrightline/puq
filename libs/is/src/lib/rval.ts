import { RequiredValueError } from '@puq/error';
import { def } from './def.js';

/**
 * Return the value unless undefined, or throw {@link RequiredValueError }
 * @returns T
 * @throw {@link RequiredValueError}
 */
export function rval<T>(value: T | undefined | null): T {
  if (def(value)) return value;
  throw new RequiredValueError(`value is ${value}`);
}
