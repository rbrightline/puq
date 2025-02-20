import { PropertyOptions as O } from '@puq/type';
import { __validateTestClass, TestClass as T } from '../utils/test-utils.js';
import { __assertErrors } from './common-utilities.spec.js';

describe('String property validation', () => {
  it.each`
    value                         | options                                  | errors
    ${{} as T}                    | ${{ type: 'string' } as O}               | ${[] as string[]}
    ${{ value: null } as T}       | ${{ type: 'string' } as O}               | ${[] as string[]}
    ${{ value: undefined } as T}  | ${{ type: 'string' } as O}               | ${[] as string[]}
    ${{ value: '' } as T}         | ${{ type: 'string' } as O}               | ${[] as string[]}
    ${{ value: 'some' } as T}     | ${{ type: 'string' } as O}               | ${[] as string[]}
    ${{ value: 1 } as T}          | ${{ type: 'string' } as O}               | ${['isString'] as string[]}
    ${{ value: 0 } as T}          | ${{ type: 'string' } as O}               | ${['isString'] as string[]}
    ${{ value: -1 } as T}         | ${{ type: 'string' } as O}               | ${['isString'] as string[]}
    ${{ value: {} } as T}         | ${{ type: 'string' } as O}               | ${['isString'] as string[]}
    ${{ value: [] } as T}         | ${{ type: 'string' } as O}               | ${['isString'] as string[]}
    ${{ value: true } as T}       | ${{ type: 'string' } as O}               | ${['isString'] as string[]}
    ${{ value: false } as T}      | ${{ type: 'string' } as O}               | ${['isString'] as string[]}
    ${{ value: 'some' } as T}     | ${{ type: 'string', minLength: 5 } as O} | ${['minLength'] as string[]}
    ${{ value: 'somesome' } as T} | ${{ type: 'string', maxLength: 5 } as O} | ${['maxLength'] as string[]}
  `(
    'should validate $value with $options and throw $errors (string-property)',
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});
