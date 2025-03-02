import { BooleanOptions } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Add boolean specific validation decorators such as `IsBoolean`
 * @param options
 * @param validationOptions
 * @returns
 */
export function BooleanValidation(
  options: BooleanOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (t, p) => {
    IsBoolean(validationOptions)(t, p);

    // If acceptString, the number-string is transformed into number
    if (options.acceptString === true) {
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
