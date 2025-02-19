import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * * Validate that the property is before the target property
 * @ignore
 */
@ValidatorConstraint({ name: 'beforeProperty', async: false })
export class BeforePropertyConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const targetValue = (args.object as any)[args.constraints[0]];
    if (targetValue == undefined) return true;
    if (value == undefined) return true;
    if (targetValue > value) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be before ${args.constraints[0]}`;
  }
}

/**
 * Validate that the property is before the target property
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function BeforeProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'BeforeProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: BeforePropertyConstraint,
    });
  };
}
