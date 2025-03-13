import { isNotDefined, isPrimitive } from '@puq/is';
import type { PropertyDecoratorParam } from '@puq/type';
import { Transform } from 'class-transformer';
import { isArray, isJSON, isObject } from 'class-validator';

export function ArrayTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isNotDefined(value)) return value;
      if (isArray(value)) return value;
      if (isPrimitive(value) || isObject(value)) return [value];
      if (isJSON(value)) JSON.parse(value);

      return value;
    })(...args);
  };
}
