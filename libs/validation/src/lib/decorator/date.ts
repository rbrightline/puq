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

    if (minDate != undefined) MinDate(minDate, validationOptions)(t, p);
    if (maxDate != undefined) MaxDate(maxDate, validationOptions)(t, p);

    if (future != undefined)
      MinISODate(new Date().toISOString(), validationOptions)(t, p);

    if (past != undefined)
      MaxISODate(new Date().toISOString(), validationOptions)(t, p);

    if (beforeProperty != undefined)
      BeforeProperty(beforeProperty, validationOptions)(t, p);

    if (afterProperty != undefined)
      AfterProperty(afterProperty, validationOptions)(t, p);

    if (sameDayAsProperty != undefined)
      SameDayProperty(sameDayAsProperty, validationOptions)(t, p);

    if (sameMonthAsProperty != undefined)
      SameMonthProperty(sameMonthAsProperty, validationOptions)(t, p);

    if (sameHourAsProperty != undefined)
      SameHourProperty(sameHourAsProperty, validationOptions)(t, p);

    if (sameWeekAsProperty != undefined)
      SameWeekProperty(sameWeekAsProperty, validationOptions)(t, p);

    if (sameYearAsProperty != undefined)
      SameYearProperty(sameYearAsProperty, validationOptions)(t, p);

    if (sameDayTypeAsProperty != undefined)
      SameDayTypeProperty(sameDayTypeAsProperty, validationOptions)(t, p);
  };
}
