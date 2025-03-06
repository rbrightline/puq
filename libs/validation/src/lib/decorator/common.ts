import type { CommonOptions, PropertyDecoratorParam } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { EqualToProperty } from '../custom/equal-to-property.js';
import { DependOnProperty } from '../custom/depend-on-property.js';
import { NotWithProperty } from '../custom/not-with-property.js';
import { DefaultTransformer } from '../transformer/default.js';
import { IsThen } from '@puq/is';

/**
 * The decorator controls the following properties.
 * - **required or optional**: All values are optional by default unless required is set true
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
  return (...args: PropertyDecoratorParam) => {
    const { required, equalToProperty, dependOnProperty, notWithProperty } =
      options;

    IsThen.isTrue(
      required,
      () => IsNotEmpty(validationOptions)(...args),
      () => IsOptional(validationOptions)(...args),
    )

      .ok(equalToProperty, (value) =>
        EqualToProperty(value, validationOptions)(...args),
      )

      .ok(dependOnProperty, (value) =>
        DependOnProperty(value, validationOptions)(...args),
      )

      .ok(notWithProperty, (value) =>
        NotWithProperty(value, validationOptions)(...args),
      )

      .ok(options.default, (value) => DefaultTransformer(value)(...args));
  };
}
