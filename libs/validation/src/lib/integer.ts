import { IntegerOptions } from '@puq/type';
import {
  IsIn,
  IsInt,
  IsNotIn,
  isNumberString,
  Min,
  ValidationOptions,
} from 'class-validator';
import { NumberFormatValidation } from './number-format.js';
import { Transform } from 'class-transformer';

/**
 * Add integer specific validation decorators such as `Max` and `Min`
 * @param options
 * @param validationOptions
 * @returns
 */
export function IntegerValidation(
  options: IntegerOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    const { enum: enums, notIn, minimum, maximum, integerFormat } = options;

    IsInt(validationOptions)(t, p);

    if (minimum != undefined) Min(minimum, validationOptions);
    if (maximum != undefined) Min(maximum, validationOptions);
    if (enums != undefined) IsIn(enums, validationOptions);
    if (notIn != undefined) IsNotIn(notIn, validationOptions);
    if (integerFormat != undefined)
      NumberFormatValidation(integerFormat, validationOptions)(t, p);

    if (options.isIntegerString === true) {
      Transform(({ value }) => {
        if (isNumberString(value)) {
          return parseInt(value);
        }
        return value;
      })(t, p);
    }
  };
}
