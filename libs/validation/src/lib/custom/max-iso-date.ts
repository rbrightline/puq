/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import {
  registerDecorator,
  ValidatorConstraint,
  isISO8601,
} from 'class-validator';

/**
 * Validate the date is after the constraint date
 * @ignore
 */
@ValidatorConstraint({ name: 'maxISODate', async: false })
export class MaxISODateConstraint implements ValidatorConstraintInterface {
  validate(valueRaw: any, args: ValidationArguments) {
    const targetRaw = args.constraints[0] as string;
    if (!isISO8601(targetRaw))
      throw new Error(`MaxISODate constraint must be ISO8601 date string`);

    if (!isISO8601(valueRaw)) return true;

    const value = new Date(valueRaw);
    const target = new Date(targetRaw);

    if (value < target) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be before ${args.constraints[0]}`;
  }
}

/**
 * Validate the date is after the constraint date
 * @param isoDate ISO8601 date string new Date().toISOString()
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function MaxISODate(
  isoDate: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'MaxISODate',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [isoDate],
      validator: MaxISODateConstraint,
    });
  };
}
