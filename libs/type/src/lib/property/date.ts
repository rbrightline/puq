import type { CommonOptions } from './common.js';

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
   * Check the property comes before the target property
   */
  beforeProperty?: string;

  /**
   * Check the property comes after the target property
   */
  afterProperty?: string;

  /**
   * Check the property and target property are in the same month
   */
  sameMonthAsProperty?: string;

  /**
   * Check the property and target property are in the same year
   */
  sameWeekAsProperty?: string;

  /**
   * Check the date's year value is the same as the named property's year value
   */
  sameYearAsProperty?: string;

  /**
   * Check the property and target property are on the same day
   */
  sameDayAsProperty?: string;

  /**
   * Check the property and the target property are weekend or week day
   */
  sameDayTypeAsProperty?: string;

  /**
   * Check the property and target property are in the same hour
   */
  sameHourAsProperty?: string;
};

export type DateOptions = Readonly<CommonOptions<string> & __DateOptions>;
