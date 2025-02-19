import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * @ignore
 * Valiate that the property and the target property are not allowed together
 */
@ValidatorConstraint({ name: 'notWithProperty', async: false })
export class NotWithPropertyConstraint implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments) {
    const targetValue = (args.object as any)[args.constraints[0]];

    if (targetValue == undefined) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} and ${args.constraints[0]} are not allowed together`;
  }
}

/**
 * Valiate that the property and the target property are not allowed together
 */
export function NotWithProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'NotWithProperty',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: NotWithPropertyConstraint,
    });
  };
}
