// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Optional } from '@puq/type';
import { throwRequiredFieldMissingError } from '@puq/error';
import { isDefined } from '../defined/is-defined.js';

/**
 * Ensures the value is neither `undefined` nor `null` and return the value, otherwise throws error
 * @template - {@link T} expected value type
 * @param value  The value to validate.
 * @returns - `value`
 * @throws - error via `throwRequiredFieldMissingError`
 */
export function isDefinedOrThrow<T>(
  value: Optional<T>,
  defaultValue?: Optional<T>,
): T {
  if (isDefined(value)) return value;
  if (isDefined(defaultValue)) return defaultValue;

  throwRequiredFieldMissingError(`The value, ${value}, is not defined`, {
    data: { params: [value, defaultValue] },
  });
}
