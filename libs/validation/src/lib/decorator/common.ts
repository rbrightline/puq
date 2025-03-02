import type { CommonOptions } from '@puq/type';
import { Transform } from 'class-transformer';
import type { ValidationOptions } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { EqualToProperty } from '../custom/equal-to-property.js';
import { DependOnProperty } from '../custom/depend-on-property.js';
import { NotWithProperty } from '../custom/not-with-property.js';

/**
 * The decorator controls the following properties.
 * - **requried or optional**: All values are optional by default unless required is set true
 * - **exclude or expose**: Unless expose is set false, value is always exposed by default
 * - **default value**: Default value is used when the input is undefined
 * @param options
 * @param validationOptions
 * @returns
 */
export function CommonValidation<T>(
  options: CommonOptions<T>,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (t, p) => {
    const { equalToProperty, dependOnProperty, notWithProperty } = options;

    if (options.required === true) {
      IsNotEmpty(validationOptions)(t, p);
    } else {
      IsOptional(validationOptions)(t, p);
    }

    if (equalToProperty != undefined)
      EqualToProperty(equalToProperty, validationOptions)(t, p);

    if (dependOnProperty != undefined)
      DependOnProperty(dependOnProperty, validationOptions)(t, p);

    if (notWithProperty != undefined)
      NotWithProperty(notWithProperty, validationOptions)(t, p);

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
