import type { EmptyClass, SomeRecord } from '@puq/type';
import type { EnumeratorParam } from './enumerator-param.js';
import { isBoolean, isNumber } from '../type/is-type.js';
import { throwInvalidParameterError } from '@puq/error';

/**
 * The return type of the `entries` function
 */
export type EntriesReturnType<T> = T extends string
  ? Array<[`${number}`, string]>
  : T extends number
    ? Array<[`${number}`, `${number}`]>
    : T extends bigint
      ? Array<[`${bigint}`, `${bigint}`]>
      : T extends SomeRecord
        ? Array<[unknown, unknown]>
        : T extends EmptyClass
          ? Array<[unknown, unknown]>
          : T extends Array<unknown>
            ? Array<[unknown, unknown]>
            : never;

/**
 * Extracts the enumerable `key-value` pairs of the `value`
 * @param value - one of `string`, `number`, `object`, or `array`
 * @returns - List of key, value pairs
 */
export function entries<T extends EnumeratorParam>(
  value: T,
): EntriesReturnType<T> {
  if (isBoolean(value))
    throwInvalidParameterError(`Boolean value is not allowed`);

  const run = (v: EnumeratorParam) =>
    Object.entries(v) as unknown as EntriesReturnType<T>;

  if (isNumber(value)) {
    if (isNaN(value)) throwInvalidParameterError('NaN is not allowed');

    return run(value.toString());
  }

  return run(value);
}
