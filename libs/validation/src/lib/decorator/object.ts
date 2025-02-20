import { ObjectOptions } from '@puq/type';
import {
  isJSON,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

/**
 * Add object specific validation decorators such as `IsObject`
 * @param options
 * @param validationOptions
 * @returns
 */
export function ObjectValidation(
  options: ObjectOptions,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    IsObject(validationOptions)(t, p);
    Type(options.target)(t, p);
    ValidateNested(validationOptions)(t, p);

    if (options.required === true) {
      IsNotEmptyObject({ nullable: false }, validationOptions)(t, p);
    } else {
      IsOptional(validationOptions)(t, p);
    }
    // If acceptString, the object-string is transformed into object
    if (options.acceptString === true) {
      Transform(({ value }) => {
        if (isJSON(value)) return JSON.parse(value);
        return value;
      })(t, p);
    }
  };
}
