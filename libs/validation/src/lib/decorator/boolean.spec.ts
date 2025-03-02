import { PropertyOptions as O } from '@puq/type';
import { __validateTestClass, TestClass as T } from './test-utils.spec.js';
import { __assertErrors } from './common-utilities.spec.js';

describe('Boolean property validation', () => {
  it.each`
    value                        | options                                         | errors
    ${{} as T}                   | ${{ type: 'boolean' } as O}                     | ${[] as string[]}
    ${{ value: null } as T}      | ${{ type: 'boolean' } as O}                     | ${[] as string[]}
    ${{ value: undefined } as T} | ${{ type: 'boolean' } as O}                     | ${[] as string[]}
    ${{ value: true } as T}      | ${{ type: 'boolean' } as O}                     | ${[] as string[]}
    ${{ value: false } as T}     | ${{ type: 'boolean' } as O}                     | ${[] as string[]}
    ${{ value: 'true' } as T}    | ${{ type: 'boolean', acceptString: true } as O} | ${[] as string[]}
    ${{ value: 'false' } as T}   | ${{ type: 'boolean', acceptString: true } as O} | ${[] as string[]}
    ${{ value: 1 } as T}         | ${{ type: 'boolean', acceptString: true } as O} | ${['isBoolean'] as string[]}
    ${{ value: -1 } as T}        | ${{ type: 'boolean', acceptString: true } as O} | ${['isBoolean'] as string[]}
    ${{ value: 0 } as T}         | ${{ type: 'boolean', acceptString: true } as O} | ${['isBoolean'] as string[]}
    ${{ value: 'some' } as T}    | ${{ type: 'boolean', acceptString: true } as O} | ${['isBoolean'] as string[]}
    ${{ value: {} } as T}        | ${{ type: 'boolean', acceptString: true } as O} | ${['isBoolean'] as string[]}
    ${{ value: [] } as T}        | ${{ type: 'boolean', acceptString: true } as O} | ${['isBoolean'] as string[]}
  `(
    'should validate $value with $options and throw $errors (boolean-property)',
    ({ value, options, errors }) => {
      const foundErrors = __validateTestClass(options, value);
      __assertErrors(errors, foundErrors);
    }
  );
});
