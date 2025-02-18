import { NumberOptions } from '@puq/type';
import {
  IsIn,
  IsNotIn,
  IsNumber,
  isNumberString,
  Min,
  ValidationOptions,
} from 'class-validator';
import { NumberFormatValidation } from './number-format.js';
import { Transform } from 'class-transformer';

/**
 * Add Number specific validation decorators such as `Min` and `Max`
 * @param options
 * @param validationOptions
 * @returns
 */
export function NumberValidation(
  options: NumberOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    const { enum: enums, notIn, minimum, maximum, numberFormat } = options;

    IsNumber(undefined, validationOptions)(t, p);

    if (minimum != undefined) Min(minimum, validationOptions);
    if (maximum != undefined) Min(maximum, validationOptions);
    if (enums != undefined) IsIn(enums, validationOptions);
    if (notIn != undefined) IsNotIn(notIn, validationOptions);
    if (numberFormat != undefined)
      NumberFormatValidation(numberFormat, validationOptions)(t, p);

    if (options.isNumberString === true) {
      Transform(({ value }) => {
        if (isNumberString(value)) {
          return parseFloat(value);
        }
        return value;
      })(t, p);
    }
  };
}
