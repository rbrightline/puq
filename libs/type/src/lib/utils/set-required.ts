import type { KeyOf } from './key-of.js';

/**
 * Creates a type that makes specific keys of `T` required while preserving the rest.
 * This utility type takes an object type `T` and a subset of its keys `R`, ensuring
 * that the properties specified in `R` are always required, while other properties
 * remain optional or unchanged.
 *
 * @template T - The original object type to modify.
 * @template R - The keys of `T` that should be made required. Must extend `KeyOf<T>`.
 *
 * @remarks
 * - Uses `Omit<T, R>` to exclude the keys in `R` from `T`.
 * - Intersects with `Required<Pick<T, R>>` to make the picked keys required.
 * - Relies on `KeyOf<T>` (assumed to be `keyof T`) for keyof inference.
 *
 * @example
 * ```typescript
 * interface User {
 *   name?: string;
 *   age?: number;
 *   email?: string;
 * }
 *
 * // Make 'name' and 'age' required, keep 'email' optional
 * type RequiredUser = SetRequired<User, 'name' | 'age'>;
 *
 * const valid: RequiredUser = { name: 'Alice', age: 30 }; // OK
 * const validWithEmail: RequiredUser = { name: 'Bob', age: 25, email: 'bob@example.com' }; // OK
 * // const invalid: RequiredUser = { name: 'Charlie' }; // Error: 'age' is required
 * ```
 *
 * @example
 * ```typescript
 * interface Config {
 *   host: string;
 *   port?: number;
 * }
 *
 * // Make 'port' required
 * type FullConfig = SetRequired<Config, 'port'>;
 *
 * const config: FullConfig = { host: 'localhost', port: 8080 }; // OK
 * // const incomplete: FullConfig = { host: 'localhost' }; // Error: 'port' is required
 * ```
 */
export type SetRequired<T, R extends KeyOf<T>> = Omit<T, R> &
  Required<Pick<T, R>>;
