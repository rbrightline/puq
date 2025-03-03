// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ErrorCode } from '@puq/error';
import { throwRequiredFieldMissingError } from '@puq/error';
import { def } from '../defined/def.js';

/**
 * Ensures the value is neither `undefined` nor `null` and return the value, otherwise {@link ErrorCode.RequiredFieldMissing}.
 * @param value {T} - The value to validate.
 * @returns {T | never}
 * @throws error {@link ErrorCode.RequiredFieldMissing} if the value is `undefined` or `null`.
 */
export function rval<T>(
  value: T | undefined | null,
  defaultValue?: T | undefined | null,
): T {
  if (def(value)) return value;
  if (def(defaultValue)) return defaultValue;

  throwRequiredFieldMissingError(undefined, {
    data: { params: [value, defaultValue] },
  });
}
