import type { PropertyDecoratorParam, PropertyOptions } from '@puq/type';
import type { ValidationOptions } from 'class-validator';
import { StringValidation } from './string.js';
import { NumberValidation } from './number.js';
import { IntegerValidation } from './integer.js';
import { BooleanValidation } from './boolean.js';
import { ObjectValidation } from './object.js';
import { ArrayValidation } from './array.js';
import { BigIntValidation } from './bigint.js';
import { DateValidation } from './date.js';
import { CommonValidation } from './common.js';
import { Exclude, Expose } from 'class-transformer';

/**
 * Transform and validate class properties
 * @param options - property options
 * @param validationOptions - validation options
 * @returns
 */
export function __PropertyValidation(
  options: PropertyOptions,
  validationOptions?: Readonly<ValidationOptions>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    const type = options.type;

    switch (type) {
      case 'string':
        CommonValidation(options, validationOptions)(...args);
        StringValidation(options, validationOptions)(...args);
        break;
      case 'number':
        CommonValidation(options, validationOptions)(...args);
        NumberValidation(options, validationOptions)(...args);
        break;
      case 'integer':
        CommonValidation(options, validationOptions)(...args);
        IntegerValidation(options, validationOptions)(...args);
        break;
      case 'date':
        CommonValidation(options, validationOptions)(...args);
        DateValidation(options, validationOptions)(...args);
        break;
      case 'bigint':
        CommonValidation(options, validationOptions)(...args);
        BigIntValidation(options, validationOptions)(...args);
        break;
      case 'boolean':
        CommonValidation(options, validationOptions)(...args);
        BooleanValidation(options, validationOptions)(...args);
        break;
      case 'object':
        CommonValidation(options, validationOptions)(...args);
        ObjectValidation(options, validationOptions)(...args);
        break;

      case 'array':
        CommonValidation(options, validationOptions)(...args);
        ArrayValidation(options, validationOptions)(...args);

        if (options.items.type === 'array') break;

        __PropertyValidation(
          { ...options.items, required: options.required },
          { each: true },
        )(...args);
        break;
    }
  };
}

/**
 * Transform and validate class properties
 * For more secure and reliable input validation, set `client_max_body_size` in the server configuration
 * @param options - property options
 * @returns - property decorator
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
  options: PropertyOptions,
): PropertyDecorator {
  return (...args) => {
    // Exclude or expose
    if (options.expose == false) {
      Exclude()(...args);
    } else {
      Expose()(...args);
    }

    __PropertyValidation(options)(...args);
  };
}
