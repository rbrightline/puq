import { PropertyOptions as O } from '@puq/type';
import { __assertErrors } from './common-utilities.spec.js';
import { __validateTestClass, TestClass as T } from '../utils/test-utils.js';

describe('Common property validation', () => {
  it.each`
    value                                                     | options                                                     | errors
    ${{} as T}                                                | ${{ type: 'string' } as O}                                  | ${[] as string[]}
    ${{} as T}                                                | ${{ type: 'string', required: true, default: 'some' } as O} | ${[] as string[]}
    ${{ value: 'some' } as T}                                 | ${{ type: 'string', required: true } as O}                  | ${[] as string[]}
    ${{ value: 'some'.repeat(10000) } as T}                   | ${{ type: 'string', required: true } as O}                  | ${[] as string[]}
    ${{} as T}                                                | ${{ type: 'string', required: true } as O}                  | ${['isNotEmpty'] as string[]}
    ${{ value: undefined } as T}                              | ${{ type: 'string', required: true } as O}                  | ${['isNotEmpty'] as string[]}
    ${{ value: null } as T}                                   | ${{ type: 'string', required: true } as O}                  | ${['isNotEmpty'] as string[]}
    ${{ value: 'some' } as T}                                 | ${{ type: 'string', required: true, expose: false } as O}   | ${['isNotEmpty'] as string[]}
    ${{ value: 'some', date: new Date().toISOString() } as T} | ${{ type: 'string', required: true, expose: false } as O}   | ${['isNotEmpty'] as string[]}
  `(
    'should validate $value with $options and throw $errors (common-propery)',
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});
