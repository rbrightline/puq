import type { ArrayOptions, PropertyDecoratorParam } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ArrayTransformer } from '../transformer/array.js';
import { IsThen } from '@puq/is';

/**
 * AAdd array validation capabilities to the {@link PropertyValidation}.
 * @param options
 * @param validationOptions
 * @returns
 */
export function ArrayValidation<T>(
  options: ArrayOptions<T>,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    const { required, minSize, maxSize, uniqueItems, strict } = options;

    IsArray(validationOptions)(...args);

    IsThen

      // Is not strict
      .isNotTrue(strict, () => ArrayTransformer()(...args))

      // is required
      .isTrue(
        required,
        () => ArrayNotEmpty(validationOptions)(...args),
        () => IsOptional(validationOptions)(...args),
      )

      // unique items
      .isTrue(uniqueItems, () => ArrayUnique(validationOptions)(...args))

      // minSize
      .ok(minSize, (value) => ArrayMinSize(value, validationOptions)(...args))

      // maxSize
      .ok(maxSize, (value) => ArrayMaxSize(value, validationOptions)(...args));
  };
}
