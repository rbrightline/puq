import { RequiredValueError } from '@puq/error';
import { ne } from './ne.js';

/**
 * Ensure the `value` or `defaultValue` is not neither `undefined` or `null`, ot throw {@link RequiredValueError}
 * @param value any value
 * @param defaultValue default value
 * @throws if the value is undefined, null, or empty throws {@link RequiredValueError}
 * @returns
 */
export function rne<T>(
  value: T | undefined | null,
  defaultValue?: T | undefined | null
): T {
  if (ne(value)) return value;
  if (ne(defaultValue)) return defaultValue;

  throw new RequiredValueError(`value is empty: ${value}`);
}
