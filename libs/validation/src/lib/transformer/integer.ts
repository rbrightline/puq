import type { PropertyDecoratorParam } from '@puq/type';
import { isNumberString, isString } from 'class-validator';
import { Transform } from 'class-transformer';
import { isNotDefined } from '@puq/is';

export function IntegerTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isNotDefined(value)) return value;

      if (isString(value)) if (isNumberString(value)) return parseInt(value);
      return value;
    })(...args);
  };
}
