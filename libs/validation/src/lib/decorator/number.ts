import type { ValidationOptions } from 'class-validator';
import type { NumberOptions } from '@puq/type';
import { isNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { CommonNumberValidation } from './common-number.js';
import { NumberFormatValidation } from './number-format.js';
import { MaxDecimals } from '../custom/max-decimals.js';

/**
 * Add Number specific validation decorators such as `Min` and `Max`
 * @param options
 * @param validationOptions
 * @returns
 */
export function NumberValidation(
  options: NumberOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (t, p) => {
    const { numberFormat, maxDecimals } = options;

    CommonNumberValidation(options, validationOptions)(t, p);

    if (numberFormat != undefined)
      NumberFormatValidation(numberFormat, validationOptions)(t, p);

    // Maximum decimal numbers
    if (maxDecimals != undefined)
      MaxDecimals(maxDecimals, validationOptions)(t, p);

    // If acceptString, the number-string is transformed into number
    if (options.acceptString === true) {
      Transform(({ value }) => {
        if (isNumberString(value)) return parseFloat(value);
        return value;
      })(t, p);
    }
  };
}
