import { IsNumber, type ValidationOptions } from 'class-validator';
import type { NumberOptions, PropertyDecoratorParam } from '@puq/type';
import { CommonNumberValidation } from './common-number.js';
import { NumberFormatValidation } from './number-format.js';
import { MaxDecimals } from '../custom/max-decimals.js';
import { MaxDigits } from '../custom/max-digits.js';
import { NumberTransformer } from '../transformer/number.js';

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
  return (...args: PropertyDecoratorParam) => {
    const { numberFormat, maxDecimals } = options;

    CommonNumberValidation(options, validationOptions)(...args);

    IsNumber(undefined, validationOptions)(...args);

    if (options.strict !== true) NumberTransformer()(...args);

    MaxDigits(17, 20, validationOptions)(...args);

    if (numberFormat != undefined)
      NumberFormatValidation(numberFormat, validationOptions)(...args);

    // Maximum decimal numbers
    if (maxDecimals != undefined)
      MaxDecimals(maxDecimals, validationOptions)(...args);
  };
}
