import { StringOptions } from '@puq/type';
import {
  Contains,
  IsIn,
  IsNotIn,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { StringFormatValidation } from './string-format.js';

/**
 * Add string specific validation decorators such as `MinLength` and `MaxLength`
 * @param options
 * @param validationOptions
 * @returns
 */
export function StringValidation(
  options: StringOptions,
  validationOptions: any
): PropertyDecorator {
  return (t, p) => {
    const {
      minLength,
      maxLength,
      stringFormat,
      enum: enums,
      notIn,
      contains,
      notContains,
      startsWith,
      endsWith,
    } = options;

    IsString(validationOptions)(t, p);

    if (minLength != undefined) MinLength(minLength, validationOptions)(t, p);
    if (maxLength != undefined) MaxLength(maxLength, validationOptions)(t, p);
    if (stringFormat != undefined)
      StringFormatValidation(stringFormat, validationOptions)(t, p);

    if (enums != undefined) IsIn(enums, validationOptions)(t, p);
    if (notIn != undefined) IsNotIn(notIn, validationOptions)(t, p);
    if (contains != undefined) Contains(contains, validationOptions)(t, p);
    if (notContains != undefined)
      NotContains(notContains, validationOptions)(t, p);
    if (startsWith != undefined)
      Matches(new RegExp(`/^${startsWith}/`), {
        ...validationOptions,
        message: `$property should start with ${startsWith}`,
      })(t, p);
    if (endsWith != undefined)
      Matches(new RegExp(`/${endsWith}$/`), {
        ...validationOptions,
        message: `$property should end with ${endsWith}`,
      })(t, p);
  };
}
