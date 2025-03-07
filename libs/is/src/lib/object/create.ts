import type { Type } from '@puq/type';

export function create<T>(
  value: Type<T>,
  ...args: ConstructorParameters<Type<T>>
) {
  return new value(...args);
}
