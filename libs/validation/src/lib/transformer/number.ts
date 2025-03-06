import type { PropertyDecoratorParam } from '@puq/type';
import { isNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { isNotDefined } from '@puq/is';

export function NumberTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isNotDefined(value)) return value;
      if (isNumberString(value)) return parseFloat(value);
      return value;
    })(...args);
  };
}
