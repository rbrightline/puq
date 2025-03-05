/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  registerDecorator,
  ValidatorConstraint,
  isISO8601,
} from 'class-validator';

import type {
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
/**
 * * Validate that the property is after the target property
 * @ignore
 */
@ValidatorConstraint({ name: 'afterProperty', async: false })
export class AfterPropertyConstraint implements ValidatorConstraintInterface {
  validate(valueRaw: any, args: ValidationArguments) {
    const targetRaw = (args.object as any)[args.constraints[0]];
    if (!isISO8601(valueRaw) && !isISO8601(targetRaw)) return true;
    if (!isISO8601(valueRaw) || !isISO8601(targetRaw)) return false;

    return new Date(valueRaw) > new Date(targetRaw);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be after ${args.constraints[0]}`;
  }
}

/**
 * Validate that the property is after the target property
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function AfterProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'AfterProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: AfterPropertyConstraint,
    });
  };
}
