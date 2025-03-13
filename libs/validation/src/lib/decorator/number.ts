import { IsNumber, type ValidationOptions } from 'class-validator';
import type { NumberOptions, PropertyDecoratorParam } from '@puq/type';
import { CommonNumberValidation } from './common-number.js';
import { NumberFormatValidation } from './number-format.js';
import { MaxDecimals } from '../custom/max-decimals.js';
import { MaxDigits } from '../custom/max-digits.js';
import { NumberTransformer } from '../transformer/number.js';
import { IsThen } from '@puq/is';

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
    CommonNumberValidation(options, validationOptions)(...args);

    IsNumber(undefined, validationOptions)(...args);

    MaxDigits(17, 20, validationOptions)(...args);

    const { strict, numberFormat, maxDecimals } = options;

    IsThen.isNotTrue(strict, () => NumberTransformer()(...args))

      .ok(numberFormat, (value) =>
        NumberFormatValidation(value, validationOptions)(...args),
      )

      .ok(maxDecimals, (value) =>
        MaxDecimals(value, validationOptions)(...args),
      );
  };
}
