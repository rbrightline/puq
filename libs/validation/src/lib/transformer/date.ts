import { isNotDefined, isString } from '@puq/is';
import type { PropertyDecoratorParam, Some } from '@puq/type';
import { Transform } from 'class-transformer';
import { isArray, isISO8601 } from 'class-validator';
import { debug } from '@puq/debug';

export function dateTransformer(value: Some<string>) {
  if (isNotDefined(value)) return value;
  if (isISO8601(value)) return value;

  if (isString(value)) {
    try {
      return new Date(value).toISOString();
    } catch (error) {
      debug(`The value ${value} is not a valid date. Actual Error: ${error}`);
      return undefined;
    }
  }

  return value;
}
export function DateTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isString(value)) return dateTransformer(value);
      if (isArray(value)) return value.map(dateTransformer);

      return value;
    })(...args);
  };
}
