import type { DateOptions, PropertyDecoratorParam } from '@puq/type';
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
import { DateTransformer } from '../transformer/date.js';

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
  return (...args: PropertyDecoratorParam) => {
    IsISO8601(
      { strict: true, strictSeparator: true },
      validationOptions,
    )(...args);

    const {
      strict,
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

    IsThen.isNotFalse(strict, () => DateTransformer()(...args))
      //
      .ok(minDate, (value) => MinDate(value, validationOptions)(...args))

      .ok(maxDate, (value) => MaxDate(value, validationOptions)(...args))

      .isTrue(future, () =>
        MinISODate(new Date().toISOString(), validationOptions)(...args),
      )

      .isTrue(past, () =>
        MaxISODate(new Date().toISOString(), validationOptions)(...args),
      )

      .ok(beforeProperty, (value) =>
        BeforeProperty(value, validationOptions)(...args),
      )

      .ok(afterProperty, (value) =>
        AfterProperty(value, validationOptions)(...args),
      )

      .ok(sameDayAsProperty, (value) =>
        SameDayProperty(value, validationOptions)(...args),
      )

      .ok(sameMonthAsProperty, (value) =>
        SameMonthProperty(value, validationOptions)(...args),
      )

      .ok(sameHourAsProperty, (value) =>
        SameHourProperty(value, validationOptions)(...args),
      )

      .ok(sameWeekAsProperty, (value) =>
        SameWeekProperty(value, validationOptions)(...args),
      )

      .ok(sameYearAsProperty, (value) =>
        SameYearProperty(value, validationOptions)(...args),
      )

      .ok(sameDayTypeAsProperty, (value) =>
        SameDayTypeProperty(value, validationOptions)(...args),
      );
  };
}
