import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validate that the property is less that the target property
 * @ignore
 */
@ValidatorConstraint({ name: 'lessThanProperty', async: false })
export class LessThanPropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    if (value == undefined) return true;
    const targetValue = (args.object as any)[args.constraints[0]];
    if (targetValue == undefined) return true;

    if (value < targetValue) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be more than ${args.constraints[0]}`;
  }
}

/**
 * Validate that the property is less that the target property
 * @param targetPropertyName target property name
 * @param validationOptions {@link ValidationOptions}
 * @returns
 */
export function LessThanProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'LessThanProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: LessThanPropertyConstraint,
    });
  };
}
