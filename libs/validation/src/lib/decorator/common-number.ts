import type {
  IntegerOptions,
  NumberOptions,
  PropertyDecoratorParam,
} from '@puq/type';
import { isArray, IsEnum, IsIn, IsNotIn, Max, Min } from 'class-validator';
import type { ValidationOptions } from 'class-validator';
import { EqualToProperty } from '../custom/equal-to-property.js';
import { LessThanProperty } from '../custom/less-than-property.js';
import { MoreThanProperty } from '../custom/more-than-property.js';
import { DependOnProperty } from '../custom/depend-on-property.js';
import { IsThen } from '@puq/is';

export function CommonNumberValidation(
  options: NumberOptions | IntegerOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    const {
      enum: enums,
      notIn,
      minimum,
      maximum,
      moreThanProperty,
      lessThanProperty,
      equalToProperty,
      dependOnProperty,
    } = options;

    IsThen

      //
      .ok(
        minimum,
        (value) => Min(value, validationOptions)(...args),
        () => Min(Number.MIN_SAFE_INTEGER, validationOptions)(...args),
      )
      .ok(
        maximum,
        (value) => Max(value, validationOptions)(...args),
        () => Max(Number.MAX_SAFE_INTEGER, validationOptions)(...args),
      )

      .ok(enums, (value) => {
        if (isArray(value)) {
          IsIn(value, validationOptions)(...args);
        } else {
          IsEnum(value, validationOptions)(...args);
        }
      })

      .ok(notIn, (value) => IsNotIn(value, validationOptions))

      .ok(moreThanProperty, (value) =>
        MoreThanProperty(value, validationOptions)(...args),
      )

      .ok(lessThanProperty, (value) =>
        LessThanProperty(value, validationOptions)(...args),
      )

      .ok(equalToProperty, (value) =>
        EqualToProperty(value, validationOptions)(...args),
      )

      .ok(dependOnProperty, (value) =>
        DependOnProperty(value, validationOptions)(...args),
      );
  };
}
