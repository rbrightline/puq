import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'maxDecimals', async: false })
export class MaxDecimalsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value != 'number') return true;

    const strValue = value + '';

    const [, d] = strValue.split('.');

    if (d && d.length > args.constraints[0]) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not have more than ${args.constraints[0]} decimals`;
  }
}

export function MaxDecimals(
  maxDecimal: number,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'MaxDecimals',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [maxDecimal],
      validator: MaxDecimalsConstraint,
    });
  };
}
