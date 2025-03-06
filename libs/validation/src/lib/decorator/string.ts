import type { PropertyDecoratorParam, StringOptions } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import {
  Contains,
  isArray,
  IsEnum,
  IsIn,
  IsNotIn,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { StringFormatValidation } from './string-format.js';
import { isDefined } from '@puq/is';
import { StringTransformer } from '../transformer/string.js';

export const DEFAULT_MAX_STRING_LENGTH = 5000;

/**
 * String property validation decorator
 * @param options - {@link StringOptions}
 * @param validationOptions - {@link ValidationOptions}
 * @returns - {@link PropertyDecorator}
 */
export function StringValidation(
  options: StringOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    const {
      minLength,
      maxLength,
      stringFormat,
      enum: enums,
      notIn,
      contain,
      notContain,
      startWith,
      endWith,
      pattern,
    } = options;

    IsString(validationOptions)(...args);

    if (options.strict !== true) StringTransformer()(...args);

    isDefined(minLength) && MinLength(minLength, validationOptions)(...args);

    (isDefined(maxLength) &&
      MaxLength(maxLength, validationOptions)(...args)) ||
      MaxLength(DEFAULT_MAX_STRING_LENGTH);

    isDefined(stringFormat) &&
      StringFormatValidation(stringFormat, validationOptions)(...args);

    isDefined(enums) &&
      ((isArray(enums) && IsIn(enums, validationOptions)(...args)) ||
        IsEnum(enums, validationOptions)(...args));

    isDefined(notIn) && IsNotIn(notIn, validationOptions)(...args);

    isDefined(contain) &&
      contain.forEach((each) => {
        isDefined(each) && Contains(each, validationOptions)(...args);
      });

    isDefined(notContain) &&
      notContain.forEach((each) => {
        isDefined(each) && NotContains(each, validationOptions)(...args);
      });

    isDefined(startWith) &&
      Matches(new RegExp(`/^${startWith}/`), {
        ...validationOptions,
        message: `$property should start with ${startWith}`,
      })(...args);

    isDefined(endWith) &&
      Matches(new RegExp(`/${endWith}$/`), {
        ...validationOptions,
        message: `$property should end with ${endWith}`,
      })(...args);

    isDefined(pattern) &&
      Matches(new RegExp(pattern), {
        ...validationOptions,
        message: `$property should match the regular expression ${pattern}`,
      })(...args);
  };
}
