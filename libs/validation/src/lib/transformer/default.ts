import type { PropertyDecoratorParam } from '@puq/type';
import { isNotDefined } from '@puq/is';
import { Transform } from 'class-transformer';

export function DefaultTransformer<T>(defaultValue: T): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    if (defaultValue)
      Transform(({ value }) => {
        if (isNotDefined(value)) return defaultValue;
        return value;
      })(...args);
  };
}
