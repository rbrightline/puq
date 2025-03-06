import type { PropertyDecoratorParam, Some } from '@puq/type';
import { isArray, isNumberString, isString } from 'class-validator';
import { Transform } from 'class-transformer';
import { isNotDefined } from '@puq/is';

export function integerTransformer(value: Some<number>) {
  if (isNotDefined(value)) return value;

  if (isString(value)) if (isNumberString(value)) return parseInt(value);

  return value;
}
export function IntegerTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isString(value)) return integerTransformer(value);
      if (isArray(value)) return value.map(integerTransformer);
      return value;
    })(...args);
  };
}
