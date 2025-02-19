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
  ValidationOptions,
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
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
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
    } = options;

    IsString(validationOptions)(t, p);

    if (minLength != undefined) MinLength(minLength, validationOptions)(t, p);

    if (maxLength != undefined) MaxLength(maxLength, validationOptions)(t, p);
    else MaxLength(5000);

    if (stringFormat != undefined)
      StringFormatValidation(stringFormat, validationOptions)(t, p);

    if (enums != undefined) IsIn(enums, validationOptions)(t, p);

    if (notIn != undefined) IsNotIn(notIn, validationOptions)(t, p);

    if (contain != undefined) Contains(contain, validationOptions)(t, p);

    if (notContain != undefined)
      NotContains(notContain, validationOptions)(t, p);

    if (startWith != undefined)
      Matches(new RegExp(`/^${startWith}/`), {
        ...validationOptions,
        message: `$property should start with ${startWith}`,
      })(t, p);

    if (endWith != undefined)
      Matches(new RegExp(`/${endWith}$/`), {
        ...validationOptions,
        message: `$property should end with ${endWith}`,
      })(t, p);
  };
}
