import { Switch } from '@puq/is';
import type { NumberFormat, PropertyDecoratorParam } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import { IsIn, Max, Min } from 'class-validator';

export function NumberFormatValidation(
  format: NumberFormat,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    if (format == undefined) return;

    Switch.switchValue(format)

      .inCaseOf('digit', () =>
        IsIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], validationOptions),
      )

      .inCaseOf('fraction', () => {
        Max(1, validationOptions)(...args);
        Min(-1, validationOptions)(...args);
      })

      .inCaseOf('percent', () => {
        Max(100, validationOptions)(...args);
        Min(0, validationOptions)(...args);
      })

      .inCaseOf('positive', () => Min(0, validationOptions)(...args))

      .inCaseOf('rate', () =>
        IsIn([1, 2, 3, 4, 5], validationOptions)(...args),
      );
  };
}
