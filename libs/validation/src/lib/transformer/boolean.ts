import type { PropertyDecoratorParam } from '@puq/type';
import { Transform } from 'class-transformer';
import { isNotDefined, isString } from '@puq/is';

export function BooleanTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isNotDefined(value)) return value;
      if (isString(value))
        if (value === 'true') {
          return true;
        } else if (value === 'false') {
          return true;
        }
      return value;
    })(...args);
  };
}
