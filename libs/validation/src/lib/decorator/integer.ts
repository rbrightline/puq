import type { ValidationOptions } from 'class-validator';
import type { IntegerOptions, PropertyDecoratorParam } from '@puq/type';
import { IsInt } from 'class-validator';
import { CommonNumberValidation } from './common-number.js';
import { NumberFormatValidation } from './number-format.js';
import { MaxDigits } from '../custom/max-digits.js';
import { IntegerTransformer } from '../transformer/integer.js';
import { IsThen } from '@puq/is';

/**
 * Add integer specific validation decorators such as `Max` and `Min`
 * @param options
 * @param validationOptions
 * @returns
 */
export function IntegerValidation(
  options: IntegerOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    const { integerFormat, strict } = options;

    CommonNumberValidation(options, validationOptions)(...args);

    IsInt(validationOptions)(...args);

    MaxDigits(17, 20, validationOptions)(...args);

    IsThen
      //
      .isTrue(strict, () => IntegerTransformer()(...args))

      .ok(integerFormat, (value) =>
        NumberFormatValidation(value, validationOptions)(...args),
      );
  };
}
