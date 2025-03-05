/**
 * The `Some` type utility makes the type compatible with `unknown` values.
 * This type is useful when the expected type is known but the source is loose.
 */
export type Some<T = unknown> = T | unknown;
