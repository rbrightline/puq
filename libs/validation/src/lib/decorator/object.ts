import type { ValidationOptions } from 'class-validator';
import type { ObjectOptions, PropertyDecoratorParam } from '@puq/type';
import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  isString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsThen } from '@puq/is';
import { ObjectTransformer } from '../transformer/object.js';

/**
 * Add object specific validation decorators such as `IsObject`
 * @param options
 * @param validationOptions
 * @returns
 */
export function ObjectValidation(
  options: ObjectOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    IsObject(validationOptions)(...args);

    if (isString(options.target)) {
      throw new Error(
        `options.target must be a function that returns the class type`,
      );
    }

    Type(options.target)(...args);

    ValidateNested(validationOptions)(...args);

    const { strict, required } = options;

    IsThen
      // is strict
      .isNotTrue(strict, () => ObjectTransformer()(...args))

      // is required
      .isTrue(
        required,
        () => IsNotEmptyObject({ nullable: false }, validationOptions)(...args),
        () => IsOptional(validationOptions)(...args),
      );
  };
}
