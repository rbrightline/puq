import type { PropertyOptions, Type } from '@puq/type';
import type { TestClassWithSingleProperty } from './test-class-with-single-property.js';

export function createTestClassWithWithSinglePropertyDecorators<V>(
  options: PropertyOptions,
  ClassDecoratorFactory: <Args>(args?: Args) => ClassDecorator,
  PropertyDecoratorFactory: <Args>(args?: Args) => PropertyDecorator,
): Type<TestClassWithSingleProperty<V>> {
  @ClassDecoratorFactory()
  class Sample {
    @PropertyDecoratorFactory(options)
    value: V;
  }

  return Sample;
}
