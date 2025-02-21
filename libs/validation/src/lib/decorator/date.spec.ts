import { PropertyOptions as O } from '@puq/type';
import {
  __validateTestClass,
  TestClass as T,
  testDateValue,
} from '../utils/test-utils.js';
import { __assertErrors } from './common-utilities.spec.js';
let line = 12;
describe('Date property validation', () => {
  it.each`
    line      | value                                                                                        | options                                                 | errors
    ${line++} | ${{} as T}                                                                                   | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${line++} | ${{ value: undefined } as T}                                                                 | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${line++} | ${{ value: null } as T}                                                                      | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${line++} | ${{ value: new Date().toISOString() } as T}                                                  | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${line++} | ${{ value: new Date('10-10-2030').toISOString() } as T}                                      | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${line++} | ${{ value: new Date('10-10-2030 20:20').toISOString() } as T}                                | ${{ type: 'date' } as O}                                | ${[] as string[]}
    ${line++} | ${{ value: new Date('10-10-3000').toISOString() } as T}                                      | ${{ type: 'date', dependOnProperty: 'unsetdate' } as O} | ${['dependOnProperty'] as string[]}
    ${line++} | ${{ value: new Date('10-10-3000').toISOString(), unsetdate: new Date().toISOString() } as T} | ${{ type: 'date', dependOnProperty: 'unsetdate' } as O} | ${[] as string[]}
    ${line++} | ${{ value: new Date('10-10-3000').toISOString() } as T}                                      | ${{ type: 'date', future: true } as O}                  | ${[] as string[]}
    ${line++} | ${{ value: new Date('10-10-1960').toISOString() } as T}                                      | ${{ type: 'date', past: true } as O}                    | ${[] as string[]}
    ${line++} | ${{ value: new Date('10-10-1960').toISOString() } as T}                                      | ${{ type: 'date', beforeProperty: 'date' } as O}        | ${[] as string[]}
    ${line++} | ${{ value: new Date('10-10-3000').toISOString() } as T}                                      | ${{ type: 'date', afterProperty: 'date' } as O}         | ${[] as string[]}
    ${line++} | ${{ value: testDateValue } as T}                                                             | ${{ type: 'date', sameHourAsProperty: 'date' } as O}    | ${[] as string[]}
    ${line++} | ${{ value: testDateValue } as T}                                                             | ${{ type: 'date', sameDayAsProperty: 'date' } as O}     | ${[] as string[]}
    ${line++} | ${{ value: testDateValue } as T}                                                             | ${{ type: 'date', sameMonthAsProperty: 'date' } as O}   | ${[] as string[]}
    ${line++} | ${{ value: testDateValue } as T}                                                             | ${{ type: 'date', sameYearAsProperty: 'date' } as O}    | ${[] as string[]}
    ${line++} | ${{ value: testDateValue } as T}                                                             | ${{ type: 'date', sameWeekAsProperty: 'date' } as O}    | ${[] as string[]}
    ${line++} | ${{ value: testDateValue } as T}                                                             | ${{ type: 'date', sameDayTypeAsProperty: 'date' } as O} | ${[] as string[]}
    ${line++} | ${{ value: new Date('10-10-1970').toISOString() } as T}                                      | ${{ type: 'date', sameHourAsProperty: 'date' } as O}    | ${['sameHourProperty'] as string[]}
    ${line++} | ${{ value: new Date('10-10-1970').toISOString() } as T}                                      | ${{ type: 'date', sameDayAsProperty: 'date' } as O}     | ${['sameDayProperty'] as string[]}
    ${line++} | ${{ value: new Date('10-10-1970').toISOString() } as T}                                      | ${{ type: 'date', sameMonthAsProperty: 'date' } as O}   | ${['sameMonthProperty'] as string[]}
    ${line++} | ${{ value: new Date('10-10-1970').toISOString() } as T}                                      | ${{ type: 'date', sameYearAsProperty: 'date' } as O}    | ${['sameYearProperty'] as string[]}
    ${line++} | ${{ value: new Date('10-10-1970').toISOString() } as T}                                      | ${{ type: 'date', sameWeekAsProperty: 'date' } as O}    | ${['sameWeekProperty'] as string[]}
    ${line++} | ${{ value: new Date('10-10-1970').toISOString() } as T}                                      | ${{ type: 'date', sameDayTypeAsProperty: 'date' } as O} | ${['sameDayTypeProperty'] as string[]}
  `(
    `$line | should validate $value with $options and throw $errors (date-property)`,
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});
