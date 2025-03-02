import type { ArrayOptions } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  isJSON,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * AAdd array validation capabilities to the {@link PropertyValidation}.
 * @param options
 * @param validationOptions
 * @returns
 */
export function ArrayValidation<T>(
  options: ArrayOptions<T>,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (t, p) => {
    IsArray(validationOptions)(t, p);

    const { required, minSize, maxSize } = options;

    if (required == true) {
      ArrayNotEmpty(validationOptions)(t, p);
    } else {
      IsOptional(validationOptions)(t, p);
    }

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
