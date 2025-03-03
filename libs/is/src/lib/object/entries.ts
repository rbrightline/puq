import type { EmptyClass, SomeRecord } from '@puq/type';
import { ibool, inum } from '../type/itype.js';
import { throwInvalidParameterError } from '@puq/error';

export type EntriesParameterType = Exclude<
  string | number | SomeRecord | EmptyClass | Array<unknown>,
  boolean
>;

export type EntriesReturnType<T> = T extends string
  ? Array<[`${number}`, string]>
  : T extends number
    ? Array<[`${number}`, `${number}`]>
    : T extends bigint
      ? Array<[`${bigint}`, `${bigint}`]>
      : never;

/**
 * Extracts the enumerable `key-value` pairs of the {@link value}
 * @param value - one of `string`, `number`, `object`, `array`, or `(...class instance)`
 * @returns An array of `[key, value]` tuples
 */
export function entries<T extends EntriesParameterType>(
  value: T,
): EntriesReturnType<T> {
  if (ibool(value))
    throwInvalidParameterError(`Boolean value is not a valid paramter.`);

  const run = (v: EntriesParameterType) =>
    Object.entries(v) as unknown as EntriesReturnType<T>;

  if (inum(value)) return run(value.toString());

  return run(value);
}

entries(class A {});
