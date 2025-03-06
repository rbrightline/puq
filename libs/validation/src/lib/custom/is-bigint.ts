/* eslint-disable @typescript-eslint/no-explicit-any */
import { isBigint } from '@puq/is';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

import type {
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * @ignore
 */
@ValidatorConstraint({ name: 'isBigint', async: false })
export class IsBigintConstraint implements ValidatorConstraintInterface {
  validate(valueRaw: any, args: ValidationArguments) {
    if (isBigint(valueRaw)) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be typeof bigint`;
  }
}

/**
 * Validate that the value is `bigint` or not.
 * @param validationOptions - validation options
 * @returns - validation property decorator
 */
export function IsBigint(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'IsBigint',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [],
      validator: IsBigintConstraint,
    });
  };
}
