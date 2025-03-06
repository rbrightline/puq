import { isNotDefined } from '@puq/is';
import type { PropertyDecoratorParam } from '@puq/type';
import { Transform } from 'class-transformer';
import { isNumber, isNumberString, isString } from 'class-validator';

export function BigintTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isNotDefined(value)) return value;
      if (isString(value)) {
        if (value.length <= 100) {
          if (isNumberString(value)) {
            return BigInt(value);
          }
        }
        return 'NaN';
      } else if (isNumber(value)) {
        return BigInt(value);
      }
      return value;
    })(...args);
  };
}
