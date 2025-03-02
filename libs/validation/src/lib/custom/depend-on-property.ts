/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

/**
 * Validate that the property does not exist without the target property
 * @ignore
 */
@ValidatorConstraint({ name: 'dependOnProperty', async: false })
export class DependOnPropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const target = (args.object as any)[args.constraints[0]];
    if (target == undefined && value != undefined) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be more than ${args.constraints[0]}`;
  }
}

/**
 * Validate that the property does not exist without the target property
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function DependOnProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'DependOnProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: DependOnPropertyConstraint,
    });
  };
}
