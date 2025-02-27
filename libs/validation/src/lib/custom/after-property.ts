import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isISO8601,
} from 'class-validator';

/**
 * * Validate that the property is after the target property
 * @ignore
 */
@ValidatorConstraint({ name: 'afterProperty', async: false })
export class AfterPropertyConstraint implements ValidatorConstraintInterface {
  validate(valueRaw: any, args: ValidationArguments) {
    const targetRaw = (args.object as any)[args.constraints[0]];

    if (!isISO8601(valueRaw) && !isISO8601(targetRaw)) return true;
    if (!isISO8601(valueRaw) || !isISO8601(targetRaw)) return false;

    const value = new Date(valueRaw);
    const target = new Date(targetRaw);

    if (value > target) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be after ${args.constraints[0]}`;
  }
}

/**
 * Validate that the property is after the target property
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function AfterProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'AfterProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: AfterPropertyConstraint,
    });
  };
}
