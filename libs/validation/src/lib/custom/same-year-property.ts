import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validate that the property and the target property are in the same year
 * @ignore
 */
@ValidatorConstraint({ name: 'sameYearProperty', async: false })
export class SameYearPropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const targetValue = (args.object as any)[args.constraints[0]];

    if (value instanceof Date && targetValue instanceof Date) {
      if (value.getFullYear() === targetValue.getFullYear()) {
        return true;
      }
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} and ${args.constraints[0]} must be in the same year`;
  }
}

/**
 * Validate that the property and the target property are in the same year
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function SameYearProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'SameYearProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: SameYearPropertyConstraint,
    });
  };
}
