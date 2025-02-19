import { PropertyOptions as O } from '@puq/type';
import { __validateTestClass, TestClass as T } from '../utils/test-utils.js';

/**
 * Compare the validation errors with the found errors
 * This method is for testing purposes,
 * @ignore
 * @param expectedErrors
 * @param foundErrors
 */
export function __assertErrors(
  expectedErrors: string[],
  foundErrors: string[]
) {
  if (expectedErrors.length > 0) {
    expect(foundErrors).toHaveLength(expectedErrors.length);

    for (const e of foundErrors) {
      expect(expectedErrors).include(e);
    }

    for (const e of expectedErrors) {
      expect(foundErrors).include(e);
    }
  } else {
    if (foundErrors.length > 0) console.error(foundErrors);

    expect(foundErrors.length).toEqual(0);
  }
}

describe('CommonValidation', () => {
  it.each`
    value                                     | options                                   | errors
    ${{} as T}                                | ${{} as O}                                | ${[] as string[]}
    ${{} as T}                                | ${{ required: true, default: 1 } as O}    | ${[] as string[]}
    ${{ value: 'some' } as T}                 | ${{ required: true } as O}                | ${[] as string[]}
    ${{ value: 1 } as T}                      | ${{ required: true } as O}                | ${[] as string[]}
    ${{ value: true } as T}                   | ${{ required: true } as O}                | ${[] as string[]}
    ${{ value: false } as T}                  | ${{ required: true } as O}                | ${[] as string[]}
    ${{ value: 'some'.repeat(10000) } as T}   | ${{ required: true } as O}                | ${[] as string[]}
    ${{} as T}                                | ${{ required: true } as O}                | ${['isNotEmpty'] as string[]}
    ${{ value: undefined } as T}              | ${{ required: true } as O}                | ${['isNotEmpty'] as string[]}
    ${{ value: null } as T}                   | ${{ required: true } as O}                | ${['isNotEmpty'] as string[]}
    ${{ value: 'some' } as T}                 | ${{ required: true, expose: false } as O} | ${['isNotEmpty'] as string[]}
    ${{ value: 'some', other: 'other' } as T} | ${{ required: true, expose: false } as O} | ${['isNotEmpty'] as string[]}
  `(
    'should validate $value with $options and throw $errors',
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});
