import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validate that the property and the target property are on the same day
 * @ignore
 */
@ValidatorConstraint({ name: 'sameDayProperty', async: false })
export class SameDayPropertyConstraint implements ValidatorConstraintInterface {
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
    return `${args.property} and ${args.constraints[0]} must be on the same day`;
  }
}

/**
 * Validate that the property and the target property are on the same day
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function SameDayProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'SameDayProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: SameDayPropertyConstraint,
    });
  };
}
