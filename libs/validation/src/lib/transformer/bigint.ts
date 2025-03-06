import { isNotDefined } from '@puq/is';
import type { PropertyDecoratorParam, Some } from '@puq/type';
import { Transform } from 'class-transformer';
import { isArray, isNumber, isNumberString, isString } from 'class-validator';

export function bigintTransformer(value: Some<bigint>) {
  if (isNotDefined(value)) return value;
  if (isString(value)) {
    if (value.length <= 100) {
      if (isNumberString(value)) {
        return BigInt(value);
      }
    }
    return value;
  } else if (isNumber(value)) {
    return BigInt(value);
  }
  return value;
}
export function BigintTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isString(value)) return bigintTransformer(value);
      if (isArray(value)) return value.map(bigintTransformer);

      return value;
    })(...args);
  };
}
