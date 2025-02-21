import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isISO8601,
} from 'class-validator';

/**
 * Validate that the property and the target property are on the same day
 * @ignore
 */
@ValidatorConstraint({ name: 'sameDayProperty', async: false })
export class SameDayPropertyConstraint implements ValidatorConstraintInterface {
  validate(valueRaw: any, args: ValidationArguments) {
    const targetRaw = (args.object as any)[args.constraints[0]];

    if (!isISO8601(valueRaw) && !isISO8601(targetRaw)) return true;
    if (!isISO8601(valueRaw) || !isISO8601(targetRaw)) return false;

    const target = new Date(targetRaw);
    const value = new Date(valueRaw);

    if (
      value.getFullYear() == target.getFullYear() &&
      value.getMonth() == target.getMonth() &&
      value.getDate() === target.getDate()
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
