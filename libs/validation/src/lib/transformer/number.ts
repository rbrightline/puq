import type { PropertyDecoratorParam, Some } from '@puq/type';
import { isArray, isNumberString, isString } from 'class-validator';
import { Transform } from 'class-transformer';
import { isNotDefined } from '@puq/is';

export function numberTransformer(value: Some<number>) {
  if (isNotDefined(value)) return value;
  if (isString(value)) if (isNumberString(value)) return parseFloat(value);
  return value;
}
export function NumberTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isString(value)) return numberTransformer(value);
      if (isArray(value)) return value.map(numberTransformer);
      return value;
    })(...args);
  };
}
