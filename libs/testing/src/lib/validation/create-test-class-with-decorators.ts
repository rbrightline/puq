import type { PropertyOptions } from '@puq/type';

export function createTestClassWithDecorators<T>(
  options: PropertyOptions,
  ClassDecoratorFactory: (...args: unknown[]) => ClassDecorator,
  PropertyDecoratorFactory: (...args: unknown[]) => PropertyDecorator,
) {
  @ClassDecoratorFactory()
  class Sample {
    @PropertyDecoratorFactory(options)
    value: T;
  }

  return Sample;
}
