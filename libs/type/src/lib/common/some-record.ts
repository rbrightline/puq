import { Key } from './key.js';

/**
 * Improved version of {@link Record} type
 * If the values of the object is known then `SomeRecord<string` would be `Record<Key, string>`
 */
export type SomeRecord<V = unknown> = Record<Key, V>;
