import { IntegerOptions } from '@puq/type';
import { IsInt, isNumberString, ValidationOptions } from 'class-validator';
import { Transform } from 'class-transformer';
import { CommonNumberValidation } from './common-number.js';
import { NumberFormatValidation } from './number-format.js';

/**
 * Add integer specific validation decorators such as `Max` and `Min`
 * @param options
 * @param validationOptions
 * @returns
 */
export function IntegerValidation(
  options: IntegerOptions,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    const { integerFormat } = options;

    CommonNumberValidation(options, validationOptions)(t, p);

    IsInt(validationOptions)(t, p);

    if (integerFormat != undefined)
      NumberFormatValidation(integerFormat, validationOptions)(t, p);

    // If acceptString, the number-string is transformed into number
    if (options.acceptString === true) {
      Transform(({ value }) => {
        if (isNumberString(value)) return parseInt(value);
        return value;
      })(t, p);
    }
  };
}
