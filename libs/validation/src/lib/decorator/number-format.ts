import type { NumberFormat } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import { IsIn, Max, Min } from 'class-validator';

export function NumberFormatValidation(
  format: NumberFormat,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (t, p) => {
    if (format == undefined) return;

    switch (format) {
      case 'digit':
        IsIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], validationOptions)(t, p);
        break;

      case 'fraction':
        Max(1, validationOptions)(t, p);
        Min(-1, validationOptions)(t, p);
        break;

      case 'percent':
        Max(100, validationOptions)(t, p);
        Min(0, validationOptions)(t, p);
        break;

      case 'positive':
        Min(0, validationOptions)(t, p);
        break;

      case 'rate':
        IsIn([1, 2, 3, 4, 5], validationOptions)(t, p);
        break;
    }
  };
}
