import type { KeyOf, SomeRecord } from '@puq/type';
import { entries } from './entries.js';

/**
 * Pick the list of properties from {@link SomeRecord}
 * @param value - {@link SomeRecord}
 * @param keys - {@link Array<string>} list of properties to pick
 * @returns - {@link SomeRecord } without the {@link keys}
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
