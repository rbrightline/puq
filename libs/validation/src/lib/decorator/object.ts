import type { ValidationOptions } from 'class-validator';
import type { ObjectOptions, PropertyDecoratorParam } from '@puq/type';
import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { isDefinedOrThrow, IsThen } from '@puq/is';
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

    Type(isDefinedOrThrow(options.target))(...args);

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
