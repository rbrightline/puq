import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isISO8601,
} from 'class-validator';

/**
 * Validate that the property and the target property are in the same month
 * @ignore
 */
@ValidatorConstraint({ name: 'sameMonthProperty', async: false })
export class SameMonthPropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(valueRaw: any, args: ValidationArguments) {
    const targetRaw = (args.object as any)[args.constraints[0]];

    if (!isISO8601(valueRaw) && !isISO8601(targetRaw)) return true;
    if (!isISO8601(valueRaw) || !isISO8601(targetRaw)) return false;

    const target = new Date(targetRaw);
    const value = new Date(valueRaw);

    if (
      value.getFullYear() == target.getFullYear() &&
      value.getMonth() == target.getMonth()
    ) {
      return true;
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
