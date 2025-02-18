import { ArrayOptions } from '@puq/type';
import { IsArray, isJSON, ValidationOptions } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Add Array specific validation decorators such as `IsArray`
 * @param options
 * @param validationOptions
 * @returns
 */
export function ArrayValidation<T>(
  options: ArrayOptions<T>,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsArray(validationOptions)(t, p);

    if (options.isJSON === true) {
      Transform(({ value }) => {
        if (isJSON(value)) return JSON.parse(value);
        else if (typeof value === 'string') return [value];
        return value;
      })(t, p);
    }
  };
}
