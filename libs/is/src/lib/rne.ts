// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ErrorCode } from '@puq/error';
import { throwEmptyFieldError } from '@puq/error';
import { ne } from './ne.js';

/**
 * Ensure the `value` or `defaultValue` is neither `undefined`, `null`, or empty (check {@link ne}), and return the value, or throw {@link RequiredValueError}
 * @param value {T | undefined | null} any value
 * @param defaultValue {T | undefined | null} default value
 * @throws error {@link ErrorCode.EmptyField} if the value is empty
 * @returns
 */
export function rne<T>(
  value: T | undefined | null,
  defaultValue?: T | undefined | null,
): T {
  if (ne(value)) return value;
  if (ne(defaultValue)) return defaultValue;

  throwEmptyFieldError(undefined, { data: { params: [value, defaultValue] } });
}
