/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { registerDecorator, ValidatorConstraint } from 'class-validator';

/**
 * @ignore
 * Validate that the property is more than the target property
 */
@ValidatorConstraint({ name: 'moreThanProperty', async: false })
export class MoreThanPropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    if (value == undefined) return true;
    const targetValue = (args.object as any)[args.constraints[0]];
    if (targetValue == undefined) return true;

    if (value > targetValue) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be more than ${args.constraints[0]}`;
  }
}

/**
 * Validate that the property is more than the target property
 */
export function MoreThanProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'MoreThanProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: MoreThanPropertyConstraint,
    });
  };
}
