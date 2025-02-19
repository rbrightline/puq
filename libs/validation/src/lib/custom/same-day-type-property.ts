import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validate that the property and the target property are weekend or week days
 * @ignore
 */
@ValidatorConstraint({ name: 'sameDayTypeProperty', async: false })
export class SameDayTypePropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const targetValue = (args.object as any)[args.constraints[0]];

    if (
      value instanceof Date &&
      targetValue instanceof Date &&
      value.getFullYear() == targetValue.getFullYear() &&
      value.getMonth() == targetValue.getMonth() &&
      value.getDate() === targetValue.getDate()
    ) {
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} and ${args.constraints[0]} must be weekend or week days`;
  }
}

/**
 * Validate that the property and the target property are weekend or week days
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function SameDayTypeProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'SameDayTypeProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: SameDayTypePropertyConstraint,
    });
  };
}
