import type { Type } from '@puq/type';

/**
 * Create a class instance by `classConstructor` and `args`
 * @param classConstructor - class constructor
 * @param args - constructor parameters
 * @returns - instance of the class
 */
export function create<T>(
  classConstructor: Type<T>,
  ...args: ConstructorParameters<Type<T>>
) {
  return new classConstructor(...args);
}
