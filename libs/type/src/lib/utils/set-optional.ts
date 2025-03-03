import type { KeyOf } from './key-of.js';

/**
 * Creates a type that makes specific keys of `T` optional while preserving the rest.
 * This utility type takes an object type `T` and a subset of its keys `R`, ensuring
 * that the properties specified in `R` become optional, while other properties retain
 * their original required or optional status.
 *
 * @template T - The original object type to modify.
 * @template R - The keys of `T` that should be made optional. Must extend `KeyOf<T>`.
 *
 * @remarks
 * - Uses `Omit<T, R>` to exclude the keys in `R` from `T`.
 * - Intersects with `Partial<Pick<T, R>>` to make the picked keys optional.
 * - Relies on `KeyOf<T>` (assumed to be `keyof T`) for keyof inference.
 *
 * @example
 * ```typescript
 * interface User {
 *   name: string;
 *   age: number;
 *   email?: string;
 * }
 *
 * // Make 'name' and 'age' optional, keep 'email' as-is
 * type OptionalUser = SetOptional<User, 'name' | 'age'>;
 *
 * const valid1: OptionalUser = { email: 'alice@example.com' }; // OK
 * const valid2: OptionalUser = { name: 'Alice', age: 30, email: 'alice@example.com' }; // OK
 * const valid3: OptionalUser = { name: 'Bob' }; // OK
 * ```
 *
 * @example
 * ```typescript
 * interface Config {
 *   host: string;
 *   port: number;
 * }
 *
 * // Make 'port' optional
 * type PartialConfig = SetOptional<Config, 'port'>;
 *
 * const config1: PartialConfig = { host: 'localhost' }; // OK
 * const config2: PartialConfig = { host: 'localhost', port: 8080 }; // OK
 * ```
 */
export type SetOptional<T, R extends KeyOf<T>> = Omit<T, R> &
  Partial<Pick<T, R>>;
