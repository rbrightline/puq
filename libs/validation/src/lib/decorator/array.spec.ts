import 'reflect-metadata';
import { PropertyOptions as O } from '@puq/type';
import { __validateTestClass, TestClass as T } from '../utils/test-utils.js';
import { __assertErrors, TestObj } from './common-utilities.spec.js';

describe('Array property validation', () => {
  //
  //
  //
  describe('String Array Validation', () => {
    it.each`
      value                                  | options                                                                              | errors
      ${{} as T}                             | ${{ type: 'array', items: { type: 'string' } } as O}                                 | ${[] as string[]}
      ${{ value: undefined } as T}           | ${{ type: 'array', items: { type: 'string' } } as O}                                 | ${[] as string[]}
      ${{ value: null } as T}                | ${{ type: 'array', items: { type: 'string' } } as O}                                 | ${[] as string[]}
      ${{ value: [] } as T}                  | ${{ type: 'array', items: { type: 'string' } } as O}                                 | ${[] as string[]}
      ${{ value: ['some'] } as T}            | ${{ type: 'array', items: { type: 'string' } } as O}                                 | ${[] as string[]}
      ${{ value: ['some'] } as T}            | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${[] as string[]}
      ${{ value: [] } as T}                  | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['arrayNotEmpty'] as string[]}
      ${{ value: [null] } as T}              | ${{ type: 'array', required: true, items: { type: 'string', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: [undefined] } as T}         | ${{ type: 'array', required: true, items: { type: 'string', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: ['some'] } as T}            | ${{ type: 'array', minSize: 2, items: { type: 'string' } } as O}                     | ${['arrayMinSize'] as string[]}
      ${{ value: ['some', 'other'] } as T}   | ${{ type: 'array', minSize: 2, items: { type: 'string' } } as O}                     | ${[] as string[]}
      ${{ value: [1] } as T}                 | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [true] } as T}              | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [false] } as T}             | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [NaN] } as T}               | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [{}] } as T}                | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [[]] } as T}                | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [1] } as T}                 | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [true] } as T}              | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [false] } as T}             | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [NaN] } as T}               | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [{}] } as T}                | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [[]] } as T}                | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isString'] as string[]}
      ${{ value: [null] } as T}              | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isNotEmpty'] as string[]}
      ${{ value: [null, undefined] } as T}   | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isNotEmpty'] as string[]}
      ${{ value: ['some', undefined] } as T} | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isNotEmpty'] as string[]}
      ${{ value: undefined } as T}           | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isNotEmpty'] as string[]}
      ${{ value: null } as T}                | ${{ type: 'array', required: true, items: { type: 'string' } } as O}                 | ${['isNotEmpty'] as string[]}
    `(
      'should validate $value with $options and throw $errors | (Array<string>)',
      ({ value, options, errors }) => {
        __assertErrors(errors, __validateTestClass(options, value));
      }
    );
  });
  //
  //
  //
  describe('Array Number', () => {
    it.each`
      value                          | options                                                                              | errors
      ${{} as T}                     | ${{ type: 'array', items: { type: 'number' } } as O}                                 | ${[] as string[]}
      ${{ value: undefined } as T}   | ${{ type: 'array', items: { type: 'number' } } as O}                                 | ${[] as string[]}
      ${{ value: null } as T}        | ${{ type: 'array', items: { type: 'number' } } as O}                                 | ${[] as string[]}
      ${{ value: [] } as T}          | ${{ type: 'array', items: { type: 'number' } } as O}                                 | ${[] as string[]}
      ${{ value: [1] } as T}         | ${{ type: 'array', items: { type: 'number' } } as O}                                 | ${[] as string[]}
      ${{ value: [1] } as T}         | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${[] as string[]}
      ${{ value: [] } as T}          | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['arrayNotEmpty'] as string[]}
      ${{ value: [null] } as T}      | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: [undefined] } as T} | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: [1] } as T}         | ${{ type: 'array', minSize: 2, items: { type: 'number' } } as O}                     | ${['arrayMinSize'] as string[]}
      ${{ value: [1, 2] } as T}      | ${{ type: 'array', minSize: 2, items: { type: 'number' } } as O}                     | ${[] as string[]}
      ${{ value: ['some'] } as T}    | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [true] } as T}      | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [false] } as T}     | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [NaN] } as T}       | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [{}] } as T}        | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [[]] } as T}        | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: ['some'] } as T}    | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [true] } as T}      | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [false] } as T}     | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [NaN] } as T}       | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [{}] } as T}        | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: [[]] } as T}        | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNumber'] as string[]}
      ${{ value: undefined } as T}   | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNotEmpty'] as string[]}
      ${{ value: null } as T}        | ${{ type: 'array', required: true, items: { type: 'number' } } as O}                 | ${['isNotEmpty'] as string[]}
    `(
      'should validate $value with $options and throw $errors | (Array<number>)',
      ({ value, options, errors }) => {
        __assertErrors(errors, __validateTestClass(options, value));
      }
    );
  });
  //
  //
  //
  describe('Array Integer', () => {
    it.each`
      value                          | options                                                                              | errors
      ${{} as T}                     | ${{ type: 'array', items: { type: 'integer' } } as O}                                | ${[] as string[]}
      ${{ value: undefined } as T}   | ${{ type: 'array', items: { type: 'integer' } } as O}                                | ${[] as string[]}
      ${{ value: null } as T}        | ${{ type: 'array', items: { type: 'integer' } } as O}                                | ${[] as string[]}
      ${{ value: [] } as T}          | ${{ type: 'array', items: { type: 'integer' } } as O}                                | ${[] as string[]}
      ${{ value: [1] } as T}         | ${{ type: 'array', items: { type: 'integer' } } as O}                                | ${[] as string[]}
      ${{ value: [1] } as T}         | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${[] as string[]}
      ${{ value: [] } as T}          | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['arrayNotEmpty'] as string[]}
      ${{ value: [null] } as T}      | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: [undefined] } as T} | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: [1] } as T}         | ${{ type: 'array', minSize: 2, items: { type: 'integer' } } as O}                    | ${['arrayMinSize'] as string[]}
      ${{ value: [1, 2] } as T}      | ${{ type: 'array', minSize: 2, items: { type: 'integer' } } as O}                    | ${[] as string[]}
      ${{ value: ['some'] } as T}    | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [true] } as T}      | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [false] } as T}     | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [NaN] } as T}       | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [{}] } as T}        | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [[]] } as T}        | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: ['some'] } as T}    | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [true] } as T}      | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [false] } as T}     | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [NaN] } as T}       | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [{}] } as T}        | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: [[]] } as T}        | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNumber'] as string[]}
      ${{ value: undefined } as T}   | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNotEmpty'] as string[]}
      ${{ value: null } as T}        | ${{ type: 'array', required: true, items: { type: 'integer' } } as O}                | ${['isNotEmpty'] as string[]}
    `(
      'should validate $value with $options and throw $errors | (Array<integer>)',
      ({ value, options, errors }) => {
        __assertErrors(errors, __validateTestClass(options, value));
      }
    );
  });
  //
  //
  //

  describe('Array Boolean', () => {
    it.each`
      value                            | options                                                                              | errors
      ${{} as T}                       | ${{ type: 'array', items: { type: 'boolean' } } as O}                                | ${[] as string[]}
      ${{ value: undefined } as T}     | ${{ type: 'array', items: { type: 'boolean' } } as O}                                | ${[] as string[]}
      ${{ value: null } as T}          | ${{ type: 'array', items: { type: 'boolean' } } as O}                                | ${[] as string[]}
      ${{ value: [] } as T}            | ${{ type: 'array', items: { type: 'boolean' } } as O}                                | ${[] as string[]}
      ${{ value: [true] } as T}        | ${{ type: 'array', items: { type: 'boolean' } } as O}                                | ${[] as string[]}
      ${{ value: [false] } as T}       | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${[] as string[]}
      ${{ value: [] } as T}            | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['arrayNotEmpty'] as string[]}
      ${{ value: [null] } as T}        | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: [undefined] } as T}   | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: [true] } as T}        | ${{ type: 'array', minSize: 2, items: { type: 'boolean' } } as O}                    | ${['arrayMinSize'] as string[]}
      ${{ value: [true, false] } as T} | ${{ type: 'array', minSize: 2, items: { type: 'boolean' } } as O}                    | ${[] as string[]}
      ${{ value: ['some'] } as T}      | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [1] } as T}           | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [-1] } as T}          | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [NaN] } as T}         | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [{}] } as T}          | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [[]] } as T}          | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: ['some'] } as T}      | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [1] } as T}           | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [-1] } as T}          | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [NaN] } as T}         | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [{}] } as T}          | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: [[]] } as T}          | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isBoolean'] as string[]}
      ${{ value: undefined } as T}     | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isNotEmpty'] as string[]}
      ${{ value: null } as T}          | ${{ type: 'array', required: true, items: { type: 'boolean' } } as O}                | ${['isNotEmpty'] as string[]}
    `(
      'should validate $value with $options and throw $errors | (Array<boolean>)',
      ({ value, options, errors }) => {
        __assertErrors(errors, __validateTestClass(options, value));
      }
    );
  });
  //
  //
  //
  describe('Array Date', () => {
    it.each`
      value                                       | options                                                                              | errors
      ${{} as T}                                  | ${{ type: 'array', items: { type: 'date' } } as O}                                   | ${[] as string[]}
      ${{ value: undefined } as T}                | ${{ type: 'array', items: { type: 'date' } } as O}                                   | ${[] as string[]}
      ${{ value: null } as T}                     | ${{ type: 'array', items: { type: 'date' } } as O}                                   | ${[] as string[]}
      ${{ value: [] } as T}                       | ${{ type: 'array', items: { type: 'date' } } as O}                                   | ${[] as string[]}
      ${{ value: [new Date()] } as T}             | ${{ type: 'array', items: { type: 'date' } } as O}                                   | ${[] as string[]}
      ${{ value: [new Date()] } as T}             | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${[] as string[]}
      ${{ value: [] } as T}                       | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['arrayNotEmpty'] as string[]}
      ${{ value: [null] } as T}                   | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: [undefined] } as T}              | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: [new Date()] } as T}             | ${{ type: 'array', minSize: 2, items: { type: 'date' } } as O}                       | ${['arrayMinSize'] as string[]}
      ${{ value: [new Date(), new Date()] } as T} | ${{ type: 'array', minSize: 2, items: { type: 'date' } } as O}                       | ${[] as string[]}
      ${{ value: ['some'] } as T}                 | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [1] } as T}                      | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [-1] } as T}                     | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [NaN] } as T}                    | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [{}] } as T}                     | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [[]] } as T}                     | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: ['some'] } as T}                 | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [1] } as T}                      | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [-1] } as T}                     | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [NaN] } as T}                    | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [{}] } as T}                     | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: [[]] } as T}                     | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isDate'] as string[]}
      ${{ value: undefined } as T}                | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isNotEmpty'] as string[]}
      ${{ value: null } as T}                     | ${{ type: 'array', required: true, items: { type: 'date' } } as O}                   | ${['isNotEmpty'] as string[]}
    `(
      'should validate $value with $options and throw $errors | (Array<Date>)',
      ({ value, options, errors }) => {
        __assertErrors(errors, __validateTestClass(options, value));
      }
    );
  });
  //
  //
  //
  describe('Array Object', () => {
    it.each`
      value                                                     | options                                                                                     | errors
      ${{} as T}                                                | ${{ type: 'array', items: { type: 'object', target: () => TestObj } } as O}                 | ${[] as string[]}
      ${{ value: undefined } as T}                              | ${{ type: 'array', items: { type: 'object', target: () => TestObj } } as O}                 | ${[] as string[]}
      ${{ value: null } as T}                                   | ${{ type: 'array', items: { type: 'object', target: () => TestObj } } as O}                 | ${[] as string[]}
      ${{ value: [] } as T}                                     | ${{ type: 'array', items: { type: 'object', target: () => TestObj } } as O}                 | ${[] as string[]}
      ${{ value: [{ value: 'some' }] } as T}                    | ${{ type: 'array', items: { type: 'object', target: () => TestObj } } as O}                 | ${[] as string[]}
      ${{ value: [{ value: 'some' }] } as T}                    | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${[] as string[]}
      ${{ value: [] } as T}                                     | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['arrayNotEmpty'] as string[]}
      ${{ value: [null] } as T}                                 | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O}        | ${['isNotEmpty'] as string[]}
      ${{ value: [undefined] } as T}                            | ${{ type: 'array', required: true, items: { type: 'number', required: true } } as O}        | ${['isNotEmpty'] as string[]}
      ${{ value: [{ value: 'some' }] } as T}                    | ${{ type: 'array', minSize: 2, items: { type: 'object', target: () => TestObj } } as O}     | ${['arrayMinSize'] as string[]}
      ${{ value: [{ value: 'some' }, { value: 'some' }] } as T} | ${{ type: 'array', minSize: 2, items: { type: 'object', target: () => TestObj } } as O}     | ${[] as string[]}
      ${{ value: ['some'] } as T}                               | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: [1] } as T}                                    | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: [-1] } as T}                                   | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: [NaN] } as T}                                  | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: [{}] } as T}                                   | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isNotEmptyObject'] as string[]}
      ${{ value: [[]] } as T}                                   | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: ['some'] } as T}                               | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: [1] } as T}                                    | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: [-1] } as T}                                   | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: [NaN] } as T}                                  | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: [[]] } as T}                                   | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isObject'] as string[]}
      ${{ value: undefined } as T}                              | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isNotEmpty'] as string[]}
      ${{ value: null } as T}                                   | ${{ type: 'array', required: true, items: { type: 'object', target: () => TestObj } } as O} | ${['isNotEmpty'] as string[]}
    `(
      'should validate $value with $options and throw $errors | (Array<Object>)',
      ({ value, options, errors }) => {
        __assertErrors(errors, __validateTestClass(options, value));
      }
    );
  });
  //
  //
  //
});
