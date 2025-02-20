import { PropertyOptions as O } from '@puq/type';
import { __validateTestClass, TestClass as T } from '../utils/test-utils.js';
import { __assertErrors } from './common-utilities.spec.js';

describe('Number property validation', () => {
  it.each`
    value                                               | options                                              | errors
    ${{} as T}                                          | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: undefined } as T}                        | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: null } as T}                             | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: 1 } as T}                                | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: -1 } as T}                               | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: 0 } as T}                                | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: 0.888888888888888888888 } as T}          | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: -0.888888888888888888888 } as T}         | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: Number.MAX_SAFE_INTEGER } as T}          | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: Number.MIN_SAFE_INTEGER } as T}          | ${{ type: 'number' } as O}                           | ${[] as string[]}
    ${{ value: NaN } as T}                              | ${{ type: 'number' } as O}                           | ${['isNumber'] as string[]}
    ${{ value: 'NA' } as T}                             | ${{ type: 'number' } as O}                           | ${['isNumber'] as string[]}
    ${{ value: true } as T}                             | ${{ type: 'number' } as O}                           | ${['isNumber'] as string[]}
    ${{ value: false } as T}                            | ${{ type: 'number' } as O}                           | ${['isNumber'] as string[]}
    ${{ value: {} } as T}                               | ${{ type: 'number' } as O}                           | ${['isNumber'] as string[]}
    ${{ value: [] } as T}                               | ${{ type: 'number' } as O}                           | ${['isNumber'] as string[]}
    ${{ value: 50000000n } as T}                        | ${{ type: 'number' } as O}                           | ${['isNumber'] as string[]}
    ${{ value: 0 } as T}                                | ${{ type: 'number', minimum: 1 } as O}               | ${['min'] as string[]}
    ${{ value: 2 } as T}                                | ${{ type: 'number', maximum: 1 } as O}               | ${['max'] as string[]}
    ${{ value: 2.99 } as T}                             | ${{ type: 'number', maxDecimals: 2 } as O}           | ${[] as string[]}
    ${{ value: 2.124124 } as T}                         | ${{ type: 'number', maxDecimals: 2 } as O}           | ${['maxDecimals'] as string[]}
    ${{ value: 124 } as T}                              | ${{ type: 'number', numberFormat: 'percent' } as O}  | ${['max'] as string[]}
    ${{ value: 124 } as T}                              | ${{ type: 'number', numberFormat: 'digit' } as O}    | ${['isIn'] as string[]}
    ${{ value: 124 } as T}                              | ${{ type: 'number', numberFormat: 'rate' } as O}     | ${['isIn'] as string[]}
    ${{ value: 124 } as T}                              | ${{ type: 'number', numberFormat: 'fraction' } as O} | ${['max'] as string[]}
    ${{ value: Number.MAX_SAFE_INTEGER + 1 } as T}      | ${{ type: 'number' } as O}                           | ${['max'] as string[]}
    ${{ value: Number.MIN_SAFE_INTEGER - 1 } as T}      | ${{ type: 'number' } as O}                           | ${['min'] as string[]}
    ${{ value: Number.MAX_SAFE_INTEGER + 1 + '' } as T} | ${{ type: 'number', acceptString: true } as O}       | ${['max'] as string[]}
    ${{ value: Number.MIN_SAFE_INTEGER - 1 + '' } as T} | ${{ type: 'number', acceptString: true } as O}       | ${['min'] as string[]}
  `(
    'should validate $value with $options and throw $errors (number-property)',
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});
