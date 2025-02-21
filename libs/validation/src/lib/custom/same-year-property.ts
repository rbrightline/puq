import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isISO8601,
} from 'class-validator';

/**
 * Validate that the property and the target property are in the same year
 * @ignore
 */
@ValidatorConstraint({ name: 'sameYearProperty', async: false })
export class SameYearPropertyConstraint
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
      value.getMonth() == target.getMonth() &&
      Math.abs(value.getDate() - target.getDate()) <= 6
    ) {
      return true;
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
