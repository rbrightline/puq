import type { ValidationOptions } from 'class-validator';
import type { ObjectOptions, PropertyDecoratorParam } from '@puq/type';
import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { isDefinedOrThrow } from '@puq/is';
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

    if (options.strict !== true) ObjectTransformer()(...args);

    if (options.required === true) {
      IsNotEmptyObject({ nullable: false }, validationOptions)(...args);
    } else {
      IsOptional(validationOptions)(...args);
    }
  };
}
