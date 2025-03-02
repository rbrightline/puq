import 'reflect-metadata';
import { PropertyOptions as O } from '@puq/type';
import { __validateTestClass, TestClass as T } from './test-utils.spec.js';
import { __assertErrors, TestObj } from './common-utilities.spec.js';

describe('Object property validation', () => {
  it.each`
    value                                   | options                                                           | errors
    ${{} as T}                              | ${{ type: 'object', target: () => TestObj } as O}                 | ${[] as string[]}
    ${{ value: undefined } as T}            | ${{ type: 'object', target: () => TestObj } as O}                 | ${[] as string[]}
    ${{ value: null } as T}                 | ${{ type: 'object', target: () => TestObj } as O}                 | ${[] as string[]}
    ${{ value: { value: undefined } } as T} | ${{ type: 'object', target: () => TestObj } as O}                 | ${[] as string[]}
    ${{ value: { value: null } } as T}      | ${{ type: 'object', target: () => TestObj } as O}                 | ${[] as string[]}
    ${{ value: { value: null } } as T}      | ${{ type: 'object', target: () => TestObj } as O}                 | ${[] as string[]}
    ${{ value: { value: 'some' } } as T}    | ${{ type: 'object', target: () => TestObj } as O}                 | ${[] as string[]}
    ${{ value: { value: '' } } as T}        | ${{ type: 'object', target: () => TestObj } as O}                 | ${[] as string[]}
    ${{ value: null } as T}                 | ${{ type: 'object', required: true, target: () => TestObj } as O} | ${['isNotEmpty'] as string[]}
    ${{ value: undefined } as T}            | ${{ type: 'object', required: true, target: () => TestObj } as O} | ${['isNotEmpty'] as string[]}
  `(
    'should validate $value with $options and throw $errors | object-property)',
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});
