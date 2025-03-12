/**
 * Creates a new instance of a class from an existing instance using its constructor.
 * This function takes an instance of a class and invokes its constructor with the provided
 * parameters to produce a new instance of the same type. It’s useful for creating fresh
 * instances without manually referencing the class constructor.
 *
 * @deprecated - use {@link create}
 * @template T - The constructor type (a class) that produces instances of `InstanceType<T>`.
 * @param instance - An existing instance of the class, used to access its constructor.
 * @param parameters - Arguments to pass to the constructor, matching its signature.
 * @returns - A new instance of the same class as `instance`.
 * @throws - If `instance` is not an object or lacks a constructor.
 * @example
 * ```typescript
 * class Person {
 *   constructor(public name: string, public age: number) {}
 * }
 * const original = new Person('Alice', 30);
 * const newPerson = newFrom(original, 'Bob', 25);
 * console.log(newPerson); // Person { name: 'Bob', age: 25 }
 * ```
 */
export function newFrom<P, T extends new (...args: P[]) => any>(
  instance: InstanceType<T>,
  ...parameters: P[]
): InstanceType<T> {
  const Constructor = instance.constructor as T;
  return new Constructor(...parameters);
}
