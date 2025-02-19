import { CommonOptions } from './common.js';

export type __DateOptions = {
  type: 'date';

  /**
   * Check the date is after the date
   */
  minDate?: Date;

  /**
   * Check the date is before the date
   */
  maxDate?: Date;

  /**
   * Check the date is future date
   */
  future?: boolean;

  /**
   * Check the date is past date
   */
  past?: boolean;

  /**
   * Check the date is before the named property's value
   */
  beforeProperty?: string;
  /**
   * Check the date is after the named property's value
   */
  afterProperty?: string;

  /**
   * Check the date's month value is the same as the named property's month value
   */
  sameMonthAsProperty?: string;

  /**
   * Check the date's week value is the same as the named property's week value
   */
  sameWeekAsProperty?: string;

  /**
   * Check the date's year value is the same as the named property's year value
   */
  sameYearAsProperty?: string;

  /**
   * Check the date's day value is the same as the named property's day value
   */
  sameDayAsProperty?: string;

  /**
   * Check the date's day type (inweek or weekend) value is the same as the named property's day type value
   */
  sameDayTypeAsProperty?: string;

  /**
   * Check the date's day type (inweek or weekend) value is the same as the named property's day type value
   */
  sameHourAsProperty?: string;
};

export type DateOptions = Readonly<CommonOptions<Date> & __DateOptions>;
