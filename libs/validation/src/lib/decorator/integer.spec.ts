import { PropertyOptions as O } from '@puq/type';
import { __validateTestClass, TestClass as T } from '../utils/test-utils.js';
import { __assertErrors } from './common.spec.js';

describe('IntegerValidation', () => {
  it.each`
    value                                                      | options                                                | errors
    ${{} as T}                                                 | ${{ type: 'integer' } as O}                            | ${[] as string[]}
    ${{ value: undefined } as T}                               | ${{ type: 'integer' } as O}                            | ${[] as string[]}
    ${{ value: null } as T}                                    | ${{ type: 'integer' } as O}                            | ${[] as string[]}
    ${{ value: 1 } as T}                                       | ${{ type: 'integer' } as O}                            | ${[] as string[]}
    ${{ value: -1 } as T}                                      | ${{ type: 'integer' } as O}                            | ${[] as string[]}
    ${{ value: 0 } as T}                                       | ${{ type: 'integer' } as O}                            | ${[] as string[]}
    ${{ value: 0.888888888888888888888 } as T}                 | ${{ type: 'integer' } as O}                            | ${['isInt'] as string[]}
    ${{ value: -0.888888888888888888888 } as T}                | ${{ type: 'integer' } as O}                            | ${['isInt'] as string[]}
    ${{ value: Number.MAX_SAFE_INTEGER } as T}                 | ${{ type: 'integer' } as O}                            | ${[] as string[]}
    ${{ value: Number.MIN_SAFE_INTEGER } as T}                 | ${{ type: 'integer' } as O}                            | ${[] as string[]}
    ${{ value: NaN } as T}                                     | ${{ type: 'integer' } as O}                            | ${['isNumber'] as string[]}
    ${{ value: 'NA' } as T}                                    | ${{ type: 'integer' } as O}                            | ${['isNumber'] as string[]}
    ${{ value: true } as T}                                    | ${{ type: 'integer' } as O}                            | ${['isNumber'] as string[]}
    ${{ value: false } as T}                                   | ${{ type: 'integer' } as O}                            | ${['isNumber'] as string[]}
    ${{ value: {} } as T}                                      | ${{ type: 'integer' } as O}                            | ${['isNumber'] as string[]}
    ${{ value: [] } as T}                                      | ${{ type: 'integer' } as O}                            | ${['isNumber'] as string[]}
    ${{ value: 50000000n } as T}                               | ${{ type: 'integer' } as O}                            | ${['isNumber'] as string[]}
    ${{ value: 0 } as T}                                       | ${{ type: 'integer', minimum: 1 } as O}                | ${['min'] as string[]}
    ${{ value: 2 } as T}                                       | ${{ type: 'integer', maximum: 1 } as O}                | ${['max'] as string[]}
    ${{ value: 124 } as T}                                     | ${{ type: 'integer', integerFormat: 'percent' } as O}  | ${['max'] as string[]}
    ${{ value: 124 } as T}                                     | ${{ type: 'integer', integerFormat: 'digit' } as O}    | ${['isIn'] as string[]}
    ${{ value: 124 } as T}                                     | ${{ type: 'integer', integerFormat: 'rate' } as O}     | ${['isIn'] as string[]}
    ${{ value: -100 } as T}                                    | ${{ type: 'integer', integerFormat: 'positive' } as O} | ${['min'] as string[]}
    ${{ value: Number.MAX_SAFE_INTEGER + 1 } as T}             | ${{ type: 'integer' } as O}                            | ${['max'] as string[]}
    ${{ value: Number.MIN_SAFE_INTEGER - 1 } as T}             | ${{ type: 'integer' } as O}                            | ${['min'] as string[]}
    ${{ value: '928374918723498172349187324902783492' } as T}  | ${{ type: 'integer', acceptString: true } as O}        | ${['max'] as string[]}
    ${{ value: '-928374918723498172349187324902783492' } as T} | ${{ type: 'integer', acceptString: true } as O}        | ${['min'] as string[]}
  `(
    'should validate $value with $options and throw $errors',
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});
