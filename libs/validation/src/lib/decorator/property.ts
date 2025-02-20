import { PropertyOptions } from '@puq/type';
import { StringValidation } from './string.js';
import { ValidationOptions } from 'class-validator';
import { NumberValidation } from './number.js';
import { IntegerValidation } from './integer.js';
import { BooleanValidation } from './boolean.js';
import { ObjectValidation } from './object.js';
import { ArrayValidation } from './array.js';
import { BigIntValiation } from './bigint.js';
import { DateValidation } from './date.js';
import { CommonValidation } from './common.js';
import { Exclude, Expose } from 'class-transformer';

/**
 * @exclude
 * @param options
 * @param validationOptions
 * @returns
 */
export function __PropertyValidation(
  options: PropertyOptions,
  validationOptions?: Readonly<ValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    const type = options.type;

    switch (type) {
      case 'string':
        CommonValidation(options, validationOptions)(t, p);
        StringValidation(options, validationOptions)(t, p);
        break;
      case 'number':
        CommonValidation(options, validationOptions)(t, p);
        NumberValidation(options, validationOptions)(t, p);
        break;
      case 'integer':
        CommonValidation(options, validationOptions)(t, p);
        IntegerValidation(options, validationOptions)(t, p);
        break;
      case 'date':
        CommonValidation(options, validationOptions)(t, p);
        DateValidation(options, validationOptions)(t, p);
        break;
      case 'bigint':
        CommonValidation(options, validationOptions)(t, p);
        BigIntValiation(options, validationOptions)(t, p);
        break;
      case 'boolean':
        CommonValidation(options, validationOptions)(t, p);
        BooleanValidation(options, validationOptions)(t, p);
        break;
      case 'object':
        CommonValidation(options, validationOptions)(t, p);
        ObjectValidation(options, validationOptions)(t, p);
        break;

      case 'array':
        CommonValidation(options, validationOptions)(t, p);
        ArrayValidation(options, validationOptions)(t, p);
        __PropertyValidation(
          { ...options.items, required: options.required },
          { each: true }
        )(t, p);
        break;
    }
  };
}

/**
 * Property validation decorator
 * For more secure and reliable input validation, set `client_max_body_size` in the nginx server
 * Also for Irregular, store and ban the IP addresses
 * @param options {@link PropertyOptions}
 * @returns propertyDecorator {@link PropertyDecorator}
 *
 *````ts
 * export class Sample {
 *
 *  \@Property({ type: 'string', minLength: 3 }) name: string;
 *
 *  \@Property({ type: 'number', minimum: 0 }) positive: number;
 *
 *  \@Property({ type: 'integer', minimum: 0 }) positive: number;
 *
 *  \@Property({ type: 'boolean' }) active: boolean;
 *
 *  \@Property({ type: 'object', target:()=>SomeClass }) someClass: SomeClass;
 *
 *  \@Property({ type: 'array', items: { type: 'string' } }) someClass: SomeClass
 *
 * }
 *````
 */
export function PropertyValidation(
  options: PropertyOptions
): PropertyDecorator {
  return (t, p) => {
    // Exclude or expose
    if (options.expose == false) {
      Exclude()(t, p);
    } else {
      Expose()(t, p);
    }

    __PropertyValidation(options)(t, p);
  };
}
