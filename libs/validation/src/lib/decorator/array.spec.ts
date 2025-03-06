import 'reflect-metadata';
import { PropertyOptions as Options } from '@puq/type';
import { PropertyValidation } from './property.js';
import {
  createTestClassWithWithSinglePropertyDecorators as createClass,
  TestClassWithSingleProperty as TestClass,
  createTestClassWithWithSinglePropertyDecorators,
  transformAndValidate,
} from '@puq/testing';
import { Exclude } from 'class-transformer';

class ObjDto extends createTestClassWithWithSinglePropertyDecorators(
  { type: 'string' },
  () => Exclude(),
  (options: unknown) => PropertyValidation(options as Options),
) {}

describe('PropertyValidation: Array', () => {
  //
  describe('Valid Cases: Spec', () => {
    it.each`
      index | options                                                    | value
      ${1}  | ${{ type: 'array', items: { type: 'string' } } as Options} | ${{ value: ['1'] }}
    `(
      '$index - PropertyValidation($options) should validate $value with no errors',
      async ({ options, value }) => {
        class C extends createClass(
          options,
          () => Exclude(),
          (options: unknown) => PropertyValidation(options as Options),
        ) {}

        await transformAndValidate(C, value, []);
      },
    );
  });

  //
  describe('Valid Cases', () => {
    it.each`
      index | options                                                                                   | value
      ${1}  | ${{ type: 'array', items: { type: 'string' } } as Options}                                | ${{ value: ['1'] }}
      ${2}  | ${{ type: 'array', items: { type: 'string' } } as Options}                                | ${{ value: [] }}
      ${3}  | ${{ type: 'array', items: { type: 'string' } } as Options}                                | ${{ value: [''] }}
      ${4}  | ${{ type: 'array', items: { type: 'number' } } as Options}                                | ${{ value: [1] }}
      ${5}  | ${{ type: 'array', items: { type: 'boolean' } } as Options}                               | ${{ value: [true, false] }}
      ${6}  | ${{ type: 'array', items: { type: 'object', target: () => ObjDto } } as Options}          | ${{ value: [{}] }}
      ${7}  | ${{ type: 'array', minSize: 1, items: { type: 'string' } } as Options}                    | ${{ value: ['value'] }}
      ${8}  | ${{ type: 'array', maxSize: 2, uniqueItems: true, items: { type: 'string' } } as Options} | ${{ value: ['value', 'value2'] }}
    `(
      '$index - PropertyValidation($options) should validate $value with no errors',
      async ({ options, value }) => {
        class C extends createClass(
          options,
          () => Exclude(),
          (options: unknown) => PropertyValidation(options as Options),
        ) {}

        await transformAndValidate(C, value, []);
      },
    );
  });

  //
  describe('Invalid Cases', () => {
    it.each`
      index | options                                                                                        | value                                     | errors
      ${1}  | ${{ type: 'array', strict: true, items: { type: 'string' } } as Options}                       | ${{ value: 'some' } as TestClass}         | ${['isArray']}
      ${2}  | ${{ type: 'array', strict: true, items: { type: 'number' } } as Options}                       | ${{ value: 0 } as TestClass}              | ${['isArray']}
      ${3}  | ${{ type: 'array', strict: true, items: { type: 'integer' } } as Options}                      | ${{ value: 1 } as TestClass}              | ${['isArray']}
      ${4}  | ${{ type: 'array', strict: true, items: { type: 'boolean' } } as Options}                      | ${{ value: true } as TestClass}           | ${['isArray']}
      ${5}  | ${{ type: 'array', strict: true, items: { type: 'object', target: () => ObjDto } } as Options} | ${{ value: {} } as TestClass}             | ${['isArray']}
      ${6}  | ${{ type: 'array', strict: true, items: { type: 'string' } } as Options}                       | ${{ value: [0] } as TestClass}            | ${['isString']}
      ${7}  | ${{ type: 'array', strict: true, items: { type: 'number' } } as Options}                       | ${{ value: ['not number'] } as TestClass} | ${['isNumber', 'min', 'max']}
      ${8}  | ${{ type: 'array', items: { type: 'integer' } } as Options}                                    | ${{ value: [12.1] } as TestClass}         | ${['isInt']}
      ${9}  | ${{ type: 'array', items: { type: 'boolean' } } as Options}                                    | ${{ value: [0] } as TestClass}            | ${['isBoolean']}
      ${10} | ${{ type: 'array', items: { type: 'object', target: () => ObjDto } } as Options}               | ${{ value: [0] } as TestClass}            | ${['isObject', 'nestedValidation']}
    `(
      '$index - PropertyValidation($options) should validate $value and throw $errors',
      async ({ options, value, errors }) => {
        class C extends createTestClassWithWithSinglePropertyDecorators(
          options,
          () => Exclude(),
          (options: unknown) => PropertyValidation(options as Options),
        ) {}

        await transformAndValidate(C, value, errors);
      },
    );
  });
});
