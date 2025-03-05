import type { Key } from './key.js';

/**
 * Improved version of `Record` type that supports native object key types of `string`, `number`, and `symbol`
 * If the values of the object is known then `SomeRecord<string` would be `Record<Key, string>`
 */
export type SomeRecord<V = unknown> = Record<Key, V>;
