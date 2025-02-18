import { BooleanOptions } from '@puq/type';
import { IsBoolean, ValidationOptions } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Add boolean specific validation decorators such as `IsBoolean`
 * @param options
 * @param validationOptions
 * @returns
 */
export function BooleanValidation(
  options: BooleanOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    IsBoolean(validationOptions)(t, p);
    if (options.isBooleanString === true) {
      Transform(({ value }) => {
        if (value === 'true') {
          return true;
        } else if (value === 'false') {
          return false;
        }
        return value;
      })(t, p);
    }
  };
}
