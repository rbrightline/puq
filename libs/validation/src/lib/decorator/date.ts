import type { DateOptions } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import { IsISO8601, MaxDate, MinDate } from 'class-validator';
import { BeforeProperty } from '../custom/before-property.js';
import { AfterProperty } from '../custom/after-property.js';
import { SameDayProperty } from '../custom/same-day-property.js';
import { SameMonthProperty } from '../custom/same-month-property.js';
import { SameHourProperty } from '../custom/same-hour-property.js';
import { SameWeekProperty } from '../custom/same-week-property.js';
import { SameYearProperty } from '../custom/same-year-property.js';
import { SameDayTypeProperty } from '../custom/same-day-type-property.js';
import { MinISODate } from '../custom/min-iso-date.js';
import { MaxISODate } from '../custom/max-iso-date.js';
import { IsThen } from '@puq/is';

/**
 * Add date specific validation decorators such as `IsDate`
 * @param options``
 * @param validationOptions
 * @returns
 */
export function DateValidation(
  options: DateOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (t, p) => {
    IsISO8601({ strict: true, strictSeparator: true }, validationOptions)(t, p);

    const {
      minDate,
      maxDate,
      future,
      past,
      beforeProperty,
      afterProperty,
      sameDayAsProperty,
      sameMonthAsProperty,
      sameDayTypeAsProperty,
      sameHourAsProperty,
      sameWeekAsProperty,
      sameYearAsProperty,
    } = options;

    IsThen
      //
      .ok(minDate, (value) => MinDate(value, validationOptions)(t, p))

      .ok(maxDate, (value) => MaxDate(value, validationOptions)(t, p))

      .isTrue(future, () =>
        MinISODate(new Date().toISOString(), validationOptions)(t, p),
      )

      .isTrue(past, () =>
        MaxISODate(new Date().toISOString(), validationOptions)(t, p),
      )

      .ok(beforeProperty, (value) =>
        BeforeProperty(value, validationOptions)(t, p),
      )

      .ok(afterProperty, (value) =>
        AfterProperty(value, validationOptions)(t, p),
      )

      .ok(sameDayAsProperty, (value) =>
        SameDayProperty(value, validationOptions)(t, p),
      )

      .ok(sameMonthAsProperty, (value) =>
        SameMonthProperty(value, validationOptions)(t, p),
      )

      .ok(sameHourAsProperty, (value) =>
        SameHourProperty(value, validationOptions)(t, p),
      )

      .ok(sameWeekAsProperty, (value) =>
        SameWeekProperty(value, validationOptions)(t, p),
      )

      .ok(sameYearAsProperty, (value) =>
        SameYearProperty(value, validationOptions)(t, p),
      )

      .ok(sameDayTypeAsProperty, (value) =>
        SameDayTypeProperty(value, validationOptions)(t, p),
      );
  };
}
