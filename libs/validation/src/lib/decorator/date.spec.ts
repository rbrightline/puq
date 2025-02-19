import { PropertyOptions as O } from '@puq/type';
import {
  __validateTestClass,
  TestClass as T,
  testDateValue,
} from '../utils/test-utils.js';
import { __assertErrors } from './common.spec.js';

describe('DateValidation', () => {
  it.each`
    value                                     | options                                                 | errors
    ${{} as T}                                | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${{ value: undefined } as T}              | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${{ value: null } as T}                   | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${{ value: new Date() } as T}             | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${{ value: '10-10-2030' } as T}           | ${{ type: 'date', acceptString: true } as O}            | ${[] as string[]}
    ${{ value: '10-10-2030 20:20' } as T}     | ${{ type: 'date', acceptString: true } as O}            | ${[] as string[]}
    ${{ value: new Date('10-10-3000') } as T} | ${{ type: 'date', future: true } as O}                  | ${[] as string[]}
    ${{ value: new Date('10-10-1960') } as T} | ${{ type: 'date', past: true } as O}                    | ${[] as string[]}
    ${{ value: testDateValue } as T}          | ${{ type: 'date', sameHourAsProperty: 'date' } as O}    | ${[] as string[]}
    ${{ value: testDateValue } as T}          | ${{ type: 'date', sameDayAsProperty: 'date' } as O}     | ${[] as string[]}
    ${{ value: testDateValue } as T}          | ${{ type: 'date', sameMonthAsProperty: 'date' } as O}   | ${[] as string[]}
    ${{ value: testDateValue } as T}          | ${{ type: 'date', sameYearAsProperty: 'date' } as O}    | ${[] as string[]}
    ${{ value: testDateValue } as T}          | ${{ type: 'date', sameWeekAsProperty: 'date' } as O}    | ${[] as string[]}
    ${{ value: testDateValue } as T}          | ${{ type: 'date', sameDayTypeAsProperty: 'date' } as O} | ${[] as string[]}
    ${{ value: new Date('10-10-1970') } as T} | ${{ type: 'date', sameHourAsProperty: 'date' } as O}    | ${['sameHourProperty'] as string[]}
    ${{ value: new Date('10-10-1970') } as T} | ${{ type: 'date', sameDayAsProperty: 'date' } as O}     | ${['sameDayProperty'] as string[]}
    ${{ value: new Date('10-10-1970') } as T} | ${{ type: 'date', sameMonthAsProperty: 'date' } as O}   | ${['sameMonthProperty'] as string[]}
    ${{ value: new Date('10-10-1970') } as T} | ${{ type: 'date', sameYearAsProperty: 'date' } as O}    | ${['sameYearProperty'] as string[]}
    ${{ value: new Date('10-10-1970') } as T} | ${{ type: 'date', sameWeekAsProperty: 'date' } as O}    | ${['sameWeekProperty'] as string[]}
    ${{ value: new Date('10-10-1970') } as T} | ${{ type: 'date', sameDayTypeAsProperty: 'date' } as O} | ${['sameDayTypeProperty'] as string[]}
  `(
    'should validate $value with $options and throw $errors',
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});
