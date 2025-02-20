import { IntegerOptions, NumberOptions } from '@puq/type';
import {
  IsIn,
  IsNotIn,
  IsNumber,
  Max,
  Min,
  ValidationOptions,
} from 'class-validator';
import { MaxDigits } from '../custom/max-digits.js';
import { EqualToProperty } from '../custom/equal-to-property.js';
import { LessThanProperty } from '../custom/less-than-property.js';
import { MoreThanProperty } from '../custom/more-than-property.js';
import { DependOnProperty } from '../custom/depend-on-property.js';

export function CommonNumberValidation(
  options: NumberOptions | IntegerOptions,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
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

    IsNumber({ allowNaN: false, allowInfinity: false }, validationOptions)(
      t,
      p
    );

    // Max digits are here by default! It checks the number is in the safe range
    MaxDigits(17, 20, validationOptions)(t, p);

    if (minimum != undefined) Min(minimum, validationOptions)(t, p);
    else Min(Number.MIN_SAFE_INTEGER, validationOptions)(t, p);

    if (maximum != undefined) Max(maximum, validationOptions)(t, p);
    else Max(Number.MAX_SAFE_INTEGER, validationOptions)(t, p);

    if (enums != undefined) IsIn(enums, validationOptions);

    if (notIn != undefined) IsNotIn(notIn, validationOptions);

    if (moreThanProperty != undefined)
      MoreThanProperty(moreThanProperty, validationOptions)(t, p);

    if (lessThanProperty != undefined)
      LessThanProperty(lessThanProperty, validationOptions)(t, p);

    if (equalToProperty != undefined)
      EqualToProperty(equalToProperty, validationOptions)(t, p);

    if (dependOnProperty != undefined)
      DependOnProperty(dependOnProperty, validationOptions)(t, p);
  };
}
