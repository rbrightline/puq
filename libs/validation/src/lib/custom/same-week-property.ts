import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validate that the property and the target property are in the same week
 * @ignore
 */
@ValidatorConstraint({ name: 'sameWeekProperty', async: false })
export class SameWeekPropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const targetValue = (args.object as any)[args.constraints[0]];

    if (
      value instanceof Date &&
      targetValue instanceof Date &&
      value.getFullYear() == targetValue.getFullYear() &&
      value.getMonth() == targetValue.getMonth() &&
      Math.abs(value.getDate() - targetValue.getDate()) <= 6
    ) {
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} and ${args.constraints[0]} must be in the same week`;
  }
}

/**
 * Validate that the property and the target property are in the same week
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function SameWeekProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'SameWeekProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: SameWeekPropertyConstraint,
    });
  };
}
