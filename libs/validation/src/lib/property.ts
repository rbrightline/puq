import { PropertyOptions } from '@puq/type';
import { CommonValidation } from './common.js';
import { StringValidation } from './string.js';
import { ValidationOptions } from 'class-validator';
import { NumberValidation } from './number.js';
import { IntegerValidation } from './integer.js';
import { BooleanValidation } from './boolean.js';
import { ObjectValidation } from './object.js';
import { ArrayValidation } from './array.js';

/**
 * @exclude
 * @param options
 * @param validationOptions
 * @returns
 */
export function __PropertyValidation(
  options: PropertyOptions,
  validationOptions?: ValidationOptions
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
        __PropertyValidation(options.items, { each: true });
        break;
    }
  };
}

/**
 * Property validation decorator
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
    __PropertyValidation(options)(t, p);
  };
}
