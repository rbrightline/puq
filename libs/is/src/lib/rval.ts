import { RequiredValueError } from '@puq/error';
import { def } from './def.js';

/**
 * Ensures the value is neither `undefined` nor `null`, otherwise throws {@link RequiredValueError}.
 * @param value - The value to validate.
 * @returns The input value if it is defined.
 * @throws {@link RequiredValueError} if the value is `undefined` or `null`.
 */
export function rval<T>(value: T | undefined | null): T {
  if (def(value)) return value;
  throw new RequiredValueError(`Value is required but found ${String(value)}`);
}
