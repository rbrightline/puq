/**
 * Generic function type
 */
export type SomeFunction<Args extends any[] = any[], R = any> = (
  ...args: Args
) => R;
