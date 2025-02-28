import { RequiredValueError } from '@puq/error';
import { ne } from './ne.js';

/**
 * Ensure the `value` or `defaultValue` is neither `undefined`, `null`, or empty (check {@link ne}), and return the value, or throw {@link RequiredValueError}
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
