/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/**
 * Represents a constructor function that creates instances of type `T`.
 * @template T - The type of the instance created by the constructor. Defaults to `unknown`.
 * @extends Function - Inherits from the base `Function` type.
 * @example
 * ```typescript
 * class User {
 *   constructor(name: string) {
 *     this.name = name;
 *   }
 *   name: string;
 * }
 * const UserConstructor: Type<User> = User;
 * const user = new UserConstructor('Alice');
 * console.log(user.name); // 'Alice'
 * ```
 */
export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
