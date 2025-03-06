import type { EmptyClass, SomeRecord } from '@puq/type';

/**
 * The parameter type of the `entries` and `keys` functions
 */
export type EnumeratorParam = Exclude<
  string | number | SomeRecord | EmptyClass | Array<unknown>,
  boolean
>;
