import { CommonOptions } from '@puq/type';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidationOptions } from 'class-validator';

/**
 * Applues the common validation decorators such as `IsOptional` and `IsNotEmpty` and default transformer
 * @param options
 * @param validationOptions
 * @returns
 */
export function CommonValidation<T>(
  options: CommonOptions<T>,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    const { required } = options;

    // Exclude or expose
    if (options.expose == false) {
      Exclude()(t, p);
    } else {
      Expose()(t, p);
    }

    // Optional or required
    if (required === true) {
      IsNotEmpty(validationOptions)(t, p);
    } else {
      IsOptional(validationOptions)(t, p);
    }

    // Default value Transformer
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
