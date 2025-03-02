import type { CommonOptions } from './common.js';
import type { StringFormat } from './string-format.js';

export type __StringOptions = {
  type: 'string';

  /**
   * Minimum allowed string length
   */
  minLength?: number;
  /**
   * Maximum allowed string length
   */
  maxLength?: number;

  /**
   * String format such as email, password.
   */
  stringFormat?: StringFormat;

  /**
   * Allowed strings
   */
  enum?: Readonly<unknown[] | Record<string, unknown>>;

  /**
   * Not allowed strings
   */
  notIn?: Readonly<string[]>;

  /**
   * string starts with
   */
  startWith?: string;

  /**
   * string ends with
   */
  endWith?: string;

  /**
   * check the string contains
   */
  contain?: string[];

  /**
   * Check the string not contain
   */
  notContain?: string[];
};

export type StringOptions = Readonly<CommonOptions<string> & __StringOptions>;
