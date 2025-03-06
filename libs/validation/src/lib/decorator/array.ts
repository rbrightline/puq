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
    const vo = validationOptions;
    const { required, minSize, maxSize, uniqueItems, strict } = options;

    IsArray(vo)(...args);

    IsThen

      // is strict
      .isTrue(strict !== true, () => ArrayTransformer()(...args))

      // is requried
      .isTrue(
        required,
        () => ArrayNotEmpty(vo)(...args),
        () => IsOptional(vo)(...args),
      )

      // unique items
      .isTrue(uniqueItems, () => ArrayUnique(vo)(...args))

      // minSize
      .ok(minSize, (value) => ArrayMinSize(value, vo)(...args))

      // maxSize
      .ok(maxSize, (value) => ArrayMaxSize(value, vo)(...args));
  };
}
