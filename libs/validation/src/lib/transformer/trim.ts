import { isArray, isNotDefined, trim } from '@puq/is';
import type { PropertyDecoratorParam } from '@puq/type';
import { Transform } from 'class-transformer';
import { isString } from 'class-validator';

/**
 * Transform `string` or items of `Array<string>` into trimed string values.
 * `none-string` values are ignored
 * @returns - Transform decorator to trim the `string` and values of  `Array<string>`
 */
export function TrimTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isNotDefined(value)) return value;

      if (isString(value)) {
        return trim(value);
      } else if (isArray(value)) {
        return value.map((stringValue) => {
          if (isString(stringValue)) return trim(stringValue);
          return stringValue;
        });
      }

      return value;
    })(...args);
  };
}
