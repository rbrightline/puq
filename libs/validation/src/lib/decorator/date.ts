import { DateOptions } from '@puq/type';
import {
  IsDate,
  MaxDate,
  MinDate,
  ValidationOptions,
  isDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Add date specific validation decorators such as `IsDate`
 * @param options``
 * @param validationOptions
 * @returns
 */
export function DateValidation(
  options: DateOptions,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    IsDate(validationOptions)(t, p);

    const { minDate, maxDate, future, past } = options;

    if (minDate != undefined) MinDate(minDate, validationOptions)(t, p);
    if (maxDate != undefined) MaxDate(maxDate, validationOptions)(t, p);
    if (future != undefined) MinDate(() => new Date(), validationOptions)(t, p);
    if (past != undefined) MaxDate(() => new Date(), validationOptions)(t, p);

    // If acceptString, the date-string is transformed into date
    if (options.acceptString === true) {
      Transform(({ value }) => {
        if (isDateString(value)) return new Date(value);
        return value;
      })(t, p);
    }
  };
}
