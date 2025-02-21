import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isISO8601,
} from 'class-validator';

/**
 * Validate that the property and the target property are weekend or week days
 * @ignore
 */
@ValidatorConstraint({ name: 'sameDayTypeProperty', async: false })
export class SameDayTypePropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(valueRaw: any, args: ValidationArguments) {
    const targetRaw = (args.object as any)[args.constraints[0]];

    if (!isISO8601(valueRaw) && !isISO8601(targetRaw)) return true;
    if (!isISO8601(valueRaw) || !isISO8601(targetRaw)) return false;

    const target = new Date(targetRaw);
    const value = new Date(valueRaw);

    const weekends = [0, 6];
    const weekdays = [1, 2, 3, 4, 5];

    if (
      value.getFullYear() == target.getFullYear() &&
      value.getMonth() == target.getMonth()
    ) {
      if (
        weekdays.includes(value.getDay()) &&
        weekdays.includes(target.getDay())
      ) {
        return true;
      } else if (
        weekends.includes(value.getDay()) &&
        weekends.includes(target.getDay())
      ) {
        return true;
      }

      return false;
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
