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

export function CommonNumberValidation(
  options: NumberOptions | IntegerOptions,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    const { enum: enums, notIn, minimum, maximum } = options;

    IsNumber({ allowNaN: false, allowInfinity: false }, validationOptions)(
      t,
      p
    );

    // Max digits are here by default! It checks the number is in the safe range
    MaxDigits(17, 20, validationOptions)(t, p);

    if (minimum != undefined) Min(minimum, validationOptions)(t, p);
    else Min(Number.MIN_SAFE_INTEGER)(t, p);

    if (maximum != undefined) Max(maximum, validationOptions)(t, p);
    else Max(Number.MAX_SAFE_INTEGER)(t, p);

    if (enums != undefined) IsIn(enums, validationOptions);

    if (notIn != undefined) IsNotIn(notIn, validationOptions);
  };
}
