import type { KeyOf, SomeRecord } from '@puq/type';
import { entries } from './entries.js';

/**
 * Pick the list of properties from record
 * @param value - object record
 * @param keys - Array string to pick items from
 * @returns - object with the keys
 */
export function pick<T extends SomeRecord, K extends KeyOf<T>>(
  value: T,
  keys: K[],
): Pick<T, K> {
  const result = Object.fromEntries(
    entries(value).filter(([key]) => keys.includes(key as K)),
  );

  return result as Pick<T, K>;
}
