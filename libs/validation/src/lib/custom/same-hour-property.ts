import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validate that the property and the target property are in the same hour
 * @ignore
 */
@ValidatorConstraint({ name: 'sameHourProperty', async: false })
export class SameHourPropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const targetValue = (args.object as any)[args.constraints[0]];

    if (
      value instanceof Date &&
      targetValue instanceof Date &&
      value.getFullYear() == targetValue.getFullYear() &&
      value.getMonth() == targetValue.getMonth() &&
      value.getDate() === targetValue.getDate() &&
      value.getHours() === targetValue.getHours()
    ) {
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} and ${args.constraints[0]} must be in the same hour`;
  }
}

/**
 * Validate that the property and the target property are in the same hour
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function SameHourProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'SameHourProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: SameHourPropertyConstraint,
    });
  };
}
