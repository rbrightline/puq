import { CommonOptions } from '@puq/type';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidationOptions } from 'class-validator';

/**
 * Applues the common validation decorators such as `IsOptional` and `IsNotEmpty` and default transformer
 * @param options
 * @param validationOptions
 * @returns
 */
export function CommonValidation(
  options: CommonOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    const { required } = options;
    if (required === true) {
      IsNotEmpty(validationOptions)(t, p);
    } else {
      IsOptional(validationOptions)(t, p);
    }

    if (options.default != undefined) {
      Transform(({ value }) => {
        if (value == undefined) {
          return options.default;
        }
        return value;
      })(t, p);
    }
  };
}
