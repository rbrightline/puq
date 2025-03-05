import 'reflect-metadata';
import { PropertyOptions as Options } from '@puq/type';
import { PropertyValidation } from './property.js';

import {
  createTestClassWithWithSinglePropertyDecorators as createClass,
  transformAndValidate as validate,
  TestClassWithSingleProperty as TestClass,
  createTestClassWithWithSinglePropertyDecorators,
  transformAndValidate,
} from '@puq/testing';
import { Exclude } from 'class-transformer';

describe('PropertyValidation: Array', () => {
  //
  describe('Valid Cases', () => {
    it.each`
      options                         | value
      ${{ type: 'array' } as Options} | ${{ value: ['1'] }}
    `(
      'PropertyValidation($options) should validate $value with no errors',
      async ({ options, value, errors }) => {
        class C extends createClass(
          options,
          () => Exclude(),
          (options: unknown) => PropertyValidation(options as Options),
        ) {}

        await validate(C, value, []);
      },
    );
  });

  //
  describe('Invalid Cases', () => {
    it.each`
      options                                                     | value                             | errors
      ${{ type: 'array', items: { type: 'number' } } as Options}  | ${{ value: 0 } as TestClass}      | ${['isArray']}
      ${{ type: 'array', items: { type: 'string' } } as Options}  | ${{ value: 'some' } as TestClass} | ${['isArray']}
      ${{ type: 'array', items: { type: 'boolean' } } as Options} | ${{ value: true } as TestClass}   | ${['isArray']}
      ${{ type: 'array', items: { type: 'object' } } as Options}  | ${{ value: {} } as TestClass}     | ${['isArray']}
      ${{ type: 'array', items: { type: 'integer' } } as Options} | ${{ value: 1 } as TestClass}      | ${['isArray']}
    `(
      'PropertyValidation($options) should validate $value and throw $errors',
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
