import { isNotDefined } from '@puq/is';
import type { PropertyDecoratorParam } from '@puq/type';
import { Transform } from 'class-transformer';
import { isJSON } from 'class-validator';

export function ObjectTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isNotDefined(value)) return value;
      if (isJSON(value)) return JSON.parse(value);

      return value;
    })(...args);
  };
}
