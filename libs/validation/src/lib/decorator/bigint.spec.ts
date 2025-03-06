import 'reflect-metadata';
import { PropertyOptions as Options } from '@puq/type';
import { PropertyValidation } from './property.js';
import {
  createTestClassWithWithSinglePropertyDecorators as createClass,
  createTestClassWithWithSinglePropertyDecorators,
  transformAndValidate,
} from '@puq/testing';
import { Exclude } from 'class-transformer';

describe('PropertyValidation: Bigint', () => {
  //
  describe('Valid Cases', () => {
    it.each`
      index | options                          | value
      ${1}  | ${{ type: 'bigint' } as Options} | ${{ value: 1n }}
      ${2}  | ${{ type: 'bigint' } as Options} | ${{ value: -100n }}
      ${3}  | ${{ type: 'bigint' } as Options} | ${{ value: 1 }}
      ${4}  | ${{ type: 'bigint' } as Options} | ${{ value: Number.MAX_SAFE_INTEGER }}
      ${5}  | ${{ type: 'bigint' } as Options} | ${{ value: Number.MIN_SAFE_INTEGER }}
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
      index | options                          | value              | errors
      ${1}  | ${{ type: 'bigint' } as Options} | ${{ value: '' }}   | ${['isBigint']}
      ${2}  | ${{ type: 'bigint' } as Options} | ${{ value: true }} | ${['isBigint']}
      ${3}  | ${{ type: 'bigint' } as Options} | ${{ value: [] }}   | ${['isBigint']}
      ${4}  | ${{ type: 'bigint' } as Options} | ${{ value: {} }}   | ${['isBigint']}
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
