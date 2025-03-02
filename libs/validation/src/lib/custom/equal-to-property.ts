/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

/**
 * Validate that the property is equal to the target property
 * @ignore
 */
@ValidatorConstraint({ name: 'equalToProperty', async: false })
export class EqualToPropertyConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value == undefined) return true;
    const targetValue = (args.object as any)[args.constraints[0]];
    if (targetValue == undefined) return true;

    if (value === targetValue) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be more than ${args.constraints[0]}`;
  }
}

/**
 * Validate that the property is equal to the target property
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function EqualToProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'EqualToProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: EqualToPropertyConstraint,
    });
  };
}
