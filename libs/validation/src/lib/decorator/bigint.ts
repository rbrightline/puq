import type { BigIntegerOptions } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import { isNumberString } from 'class-validator';
import { MaxDigits } from '../custom/max-digits.js';
import { Transform } from 'class-transformer';

export function BigIntValidation(
  options: BigIntegerOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (t, p) => {
    if (options.acceptString == true) {
      Transform(({ value }) => {
        if (typeof value === 'string') {
          if (value.length <= 100) {
            if (isNumberString(value)) {
              return BigInt(value);
            }
          }
          return 'NaN';
        } else if (typeof value === 'bigint') {
          if (value.toString().length > 100) {
            return undefined;
          }
        }
        return value;
      })(t, p);
    }

    MaxDigits(50, 50, validationOptions)(t, p);
  };
}
