import type { StringOptions } from '@puq/type';
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
  return (target, property) => {
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

    IsString(validationOptions)(target, property);

    isDefined(minLength) &&
      MinLength(minLength, validationOptions)(target, property);

    (isDefined(maxLength) &&
      MaxLength(maxLength, validationOptions)(target, property)) ||
      MaxLength(DEFAULT_MAX_STRING_LENGTH);

    isDefined(stringFormat) &&
      StringFormatValidation(stringFormat, validationOptions)(target, property);

    isDefined(enums) &&
      ((isArray(enums) && IsIn(enums, validationOptions)(target, property)) ||
        IsEnum(enums, validationOptions)(target, property));

    isDefined(notIn) && IsNotIn(notIn, validationOptions)(target, property);

    isDefined(contain) &&
      contain.forEach((each) => {
        isDefined(each) && Contains(each, validationOptions)(target, property);
      });

    isDefined(notContain) &&
      notContain.forEach((each) => {
        isDefined(each) &&
          NotContains(each, validationOptions)(target, property);
      });

    isDefined(startWith) &&
      Matches(new RegExp(`/^${startWith}/`), {
        ...validationOptions,
        message: `$property should start with ${startWith}`,
      })(target, property);

    isDefined(endWith) &&
      Matches(new RegExp(`/${endWith}$/`), {
        ...validationOptions,
        message: `$property should end with ${endWith}`,
      })(target, property);

    isDefined(pattern) &&
      Matches(new RegExp(pattern), {
        ...validationOptions,
        message: `$property should match the regular expression ${pattern}`,
      })(target, property);
  };
}
