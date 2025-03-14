import { isString } from '@puq/is';
import type { PropertyDecoratorParam } from '@puq/type';
import { Transform } from 'class-transformer';
import { isArray } from 'class-validator';

export function DateTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isString(value)) return new Date(value).toISOString();
      if (isArray(value))
        return value
          .map((dateValue) => {
            if (isString(dateValue)) return new Date(dateValue).toISOString();
            return dateValue;
          })
          .filter((dateValue) => dateValue);
      return value;
    })(...args);
  };
}
