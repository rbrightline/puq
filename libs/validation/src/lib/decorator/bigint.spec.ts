import { PropertyOptions as O } from '@puq/type';
import { __validateTestClass, TestClass as T } from '../utils/test-utils.js';
import { __assertErrors } from './common.spec.js';

describe('BigintValidation', () => {
  it.each`
    value                                                                                                                             | options                    | errors
    ${{} as T}                                                                                                                        | ${{ type: 'bigint' } as O} | ${[] as string[]}
    ${{ value: undefined } as T}                                                                                                      | ${{ type: 'bigint' } as O} | ${[] as string[]}
    ${{ value: null } as T}                                                                                                           | ${{ type: 'bigint' } as O} | ${[] as string[]}
    ${{ value: 100 } as T}                                                                                                            | ${{ type: 'bigint' } as O} | ${[] as string[]}
    ${{ value: -100 } as T}                                                                                                           | ${{ type: 'bigint' } as O} | ${[] as string[]}
    ${{ value: 9999999999999999999999999999999999n } as T}                                                                            | ${{ type: 'bigint' } as O} | ${[] as string[]}
    ${{ value: -999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999n } as T} | ${{ type: 'bigint' } as O} | ${['maxDigits'] as string[]}
    ${{ value: '-99999999999999999999999999999999999999999999999999999999999999' } as T}                                              | ${{ type: 'bigint' } as O} | ${[] as string[]}
  `(
    'should validate $value with $options and throw $errors',
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});
