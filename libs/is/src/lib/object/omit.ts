import type { KeyOf, SomeRecord } from '@puq/type';
import { entries } from './entries.js';
// - [ ] add unit test
/**
 * Omit the list of properties from {@link SomeRecord}
 * @param value - [SomeRecord](https://rbrightline.github.io/puq/type/miscellaneous/typealiases.html#SomeRecord)
 * @param keys - {@link Array<string>} list of properties to omit
 * @returns - {@link SomeRecord } without the {@link keys}
 */
export function omit<T extends SomeRecord, K extends KeyOf<T>>(
  value: T,
  keys: K[],
): Omit<T, K> {
  const result = Object.fromEntries(
    entries(value).filter(([key]) => !keys.includes(key as K)),
  );

  return result as Omit<T, K>;
}
