/**
 * Make the type nullable and undefinedable.
 * - T -> T | undefined | null
 */
export type Optional<T> = T | undefined | null;
