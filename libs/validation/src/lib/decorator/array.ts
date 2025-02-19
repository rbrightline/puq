import { ArrayOptions } from '@puq/type';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  isJSON,
  ValidationOptions,
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Add Array specific validation decorators such as `IsArray`
 * @param options
 * @param validationOptions
 * @returns
 */
export function ArrayValidation<T>(
  options: ArrayOptions<T>,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    IsArray(validationOptions)(t, p);

    const { minSize, maxSize } = options;

    if (minSize) ArrayMinSize(minSize, validationOptions)(t, p);
    if (maxSize) ArrayMaxSize(maxSize, validationOptions)(t, p);

    if (options.acceptString === true) {
      Transform(({ value }) => {
        if (isJSON(value)) return JSON.parse(value);
        else if (
          typeof value === 'string' ||
          typeof value == 'number' ||
          typeof value === 'boolean'
        )
          return [value];
        return value;
      })(t, p);
    }
  };
}
