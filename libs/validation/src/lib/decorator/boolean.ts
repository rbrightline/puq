import type { BooleanOptions, PropertyDecoratorParam } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { BooleanTransformer } from '../transformer/boolean.js';
import { IsThen } from '@puq/is';

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
  return (...args: PropertyDecoratorParam) => {
    IsBoolean(validationOptions)(...args);

    const { strict } = options;

    IsThen
      //
      .isNotTrue(strict, () => BooleanTransformer()(...args));
  };
}
