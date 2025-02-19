import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validate that the property and the target property are in the same month
 * @ignore
 */
@ValidatorConstraint({ name: 'sameMonthProperty', async: false })
export class SameMonthPropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const targetValue = (args.object as any)[args.constraints[0]];

    if (value instanceof Date && targetValue instanceof Date) {
      if (value.getMonth() === targetValue.getMonth()) {
        return true;
      }
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} and ${args.constraints[0]} must be in the same month`;
  }
}

/**
 * Validate that the property and the target property are in the same month
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function SameMonthProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'SameMonthProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: SameMonthPropertyConstraint,
    });
  };
}
