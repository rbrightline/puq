/**
 * Extracts the union of all keys from an object type `T`.
 * This utility type represents the keyof operator as a reusable type alias,
 * providing a shorthand for accessing the property names of `T`.
 *
 * @template T - The object type whose keys are extracted.
 * @returns A union of literal types representing the keys of `T`.
 *
 * @example
 * ```typescript
 * interface User {
 *   name: string;
 *   age: number;
 * }
 *
 * type UserKeys = KeyOf<User>;
 * // Result: 'name' | 'age'
 *
 * const key: UserKeys = 'name'; // OK
 * // const invalid: UserKeys = 'email'; // Error: Type '"email"' is not assignable
 * ```
 */
export type KeyOf<T> = keyof T;
