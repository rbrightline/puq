import type { EmptyClass, SomeRecord } from '@puq/type';
import { isBoolean, isNumber } from '../type/is-type.js';
import { throwInvalidParameterError } from '@puq/error';
import { EnumaratorParam } from './enumarator-param.js';

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
 * @returns An array of `[key, value]` tuples
 */
export function entries<T extends EnumaratorParam>(
  value: T,
): EntriesReturnType<T> {
  if (isBoolean(value))
    throwInvalidParameterError(
      `entries function does not support boolean input`,
    );

  const run = (v: EnumaratorParam) =>
    Object.entries(v) as unknown as EntriesReturnType<T>;

  if (isNumber(value)) return run(value.toString());

  return run(value);
}

entries(class A {});
