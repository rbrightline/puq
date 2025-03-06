import type { BigIntegerOptions, PropertyDecoratorParam } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import { MaxDigits } from '../custom/max-digits.js';
import { IsBigint } from '../custom/is-bigint.js';
import { BigintTransformer } from '../transformer/bigint.js';
import { IsThen } from '@puq/is';

export function BigIntValidation(
  options: BigIntegerOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    IsBigint(validationOptions)(...args);
    MaxDigits(50, 50, validationOptions)(...args);

    const { strict } = options;

    IsThen.isTrue(strict !== true, () => BigintTransformer()(...args));
  };
}
