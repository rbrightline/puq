/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { registerDecorator, ValidatorConstraint } from 'class-validator';

/**
 * @ignore
 * Validate the maximum allowed digits
 */
@ValidatorConstraint({ name: 'maxDigits', async: false })
export class MaxDigitsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value != 'bigint') return true;

    const strValue = value + '';

    const [w, d] = strValue.split('.');

    if (w && w.length > args.constraints[0]) return false;

    if (d && d.length > args.constraints[1]) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not contain more than ${args.constraints[0]} whole digits and ${args.constraints[0]} decimal`;
  }
}

/**
 * Validate the maximum allowed digits
 * @param wholeCount number of digits that the integer part of the number has 3 such as `100` in `100.888`
 * @param decimalCount number of digits that the decimal part of the number has 2 such as `22` in `55.22`
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function MaxDigits(
  wholeCount: number,
  decimalCount: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'maxDigits',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [wholeCount, decimalCount],
      validator: MaxDigitsConstraint,
    });
  };
}
