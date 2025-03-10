import type { EmptyClass, SomeRecord, Type } from '@puq/type';

/**
 * The parameter type of the `entries` and `keys` functions
 */
export type EnumeratorParam = Exclude<
  string | number | SomeRecord | EmptyClass | Type | Array<unknown>,
  boolean
>;
