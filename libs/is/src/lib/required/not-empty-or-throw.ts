// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ErrorCode } from '@puq/error';
import { throwEmptyFieldError } from '@puq/error';
import { notEmpty } from '../defined/not-empty.js';

/**
 * Ensure the `value` or `defaultValue` is neither `undefined`, `null`, or empty (check {@link notEmpty}), and return the value, or throw {@link RequiredValueError}
 * @param value {T | undefined | null} any value
 * @param defaultValue {T | undefined | null} default value
 * @throws error {@link ErrorCode.EmptyField} if the value is empty
 * @returns
 */
export function notEmptyOrThrow<T>(
  value: T | undefined | null,
  defaultValue?: T | undefined | null,
): T {
  if (notEmpty(value)) return value;
  if (notEmpty(defaultValue)) return defaultValue;

  throwEmptyFieldError(`The value, ${value}, is empty`, {
    data: { params: [value, defaultValue] },
  });
}
