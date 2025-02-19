import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'maxDigits', async: false })
export class MaxDigitsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value != 'bigint') return true;

    const strValue = value + '';

    const [w, d] = strValue.split('.');

    if (w && w.length > args.constraints[0]) return false;

    if (d && d.length > args.constraints[1]) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not contain more than ${args.constraints[0]} whole digits and ${args.constraints[0]} decimal`;
  }
}

export function MaxDigits(
  maxWholePart: number,
  maxDecimalPart: number,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (t, p) => {
    registerDecorator({
      name: 'maxDigits',
      target: t.constructor,
      propertyName: p.toString(),
      options: validationOptions,
      constraints: [maxWholePart, maxDecimalPart],
      validator: MaxDigitsConstraint,
    });
  };
}
