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
import { isDefined, IsThen } from '@puq/is';
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
    IsString(validationOptions)(...args);

    const {
      strict,
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

    IsThen

      // is not strict
      .isNotTrue(strict, () => StringTransformer()(...args))

      // min length
      .ok(minLength, (value) => MinLength(value, validationOptions)(...args))

      // max length
      .ok(
        maxLength,
        (value) => MaxLength(value, validationOptions)(...args),
        () => MaxLength(DEFAULT_MAX_STRING_LENGTH),
      )

      // is format
      .ok(stringFormat, (value) =>
        StringFormatValidation(value, validationOptions)(...args),
      )

      // enum class or is in array list
      .ok(enums, (value) => {
        if (isArray(value)) {
          IsIn(value, validationOptions)(...args);
        } else {
          IsEnum(value, validationOptions)(...args);
        }
      })

      // not in
      .ok(notIn, (value) => IsNotIn(value, validationOptions)(...args))

      // contain
      .ok(contain, (value) => {
        value.forEach((each) => {
          if (isDefined(each)) Contains(each, validationOptions)(...args);
        });
      })

      // not contain
      .ok(notContain, (value) => {
        value.forEach((each) => {
          if (isDefined(each)) NotContains(each, validationOptions)(...args);
        });
      })

      // start with
      .ok(startWith, (value) =>
        Matches(new RegExp(`/^${value}/`), {
          ...validationOptions,
          message: `$property should start with ${startWith}`,
        })(...args),
      )

      // end with
      .ok(endWith, (value) =>
        Matches(new RegExp(`/${value}$/`), {
          ...validationOptions,
          message: `$property should end with ${endWith}`,
        })(...args),
      )

      // pattern
      .ok(pattern, (value) =>
        Matches(new RegExp(value), {
          ...validationOptions,
          message: `$property should match the regular expression ${pattern}`,
        })(...args),
      );
  };
}
