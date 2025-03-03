import type { KeyOf } from './key-of.js';

/**
 * Represents an array of keys from an object type `T`.
 * This utility type creates an array type where each element is a key of `T`,
 * allowing you to define collections of property names. If `T` is not specified,
 * it defaults to `unknown`, resulting in an array of any possible keys.
 *
 * @template T - The object type whose keys populate the array. Defaults to `unknown`.
 * @returns An array type containing elements of type `KeyOf<T>`.
 *
 * @example
 * ```typescript
 * interface User {
 *   name: string;
 *   age: number;
 * }
 *
 * type UserKeyArray = Keys<User>;
 * // Result: ('name' | 'age')[]
 *
 * const keys: UserKeyArray = ['name', 'age']; // OK
 * const mixed: UserKeyArray = ['name', 'name', 'age']; // OK (allows duplicates)
 * // const invalid: UserKeyArray = ['name', 'email']; // Error: 'email' is not assignable
 * ```
 *
 * @example
 * ```typescript
 * // Default usage with unknown
 * type AnyKeys = Keys;
 * // Result: (string | number | symbol)[]
 *
 * const anyKeys: AnyKeys = ['a', 1, 'b']; // OK
 * ```
 */
export type Keys<T = unknown> = KeyOf<T>[];
