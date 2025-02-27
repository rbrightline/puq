import { RequiredValueError } from '@puq/error';
import { rval } from './rval.js';
describe('rval: check the value is defined or throw error', () => {
  describe('rval with defined values', () => {
    it.each`
      value          | defaultValue | expected
      ${''}          | ${undefined} | ${''}
      ${'some'}      | ${undefined} | ${'some'}
      ${' '}         | ${undefined} | ${' '}
      ${String()}    | ${undefined} | ${''}
      ${String('')}  | ${undefined} | ${''}
      ${String(' ')} | ${undefined} | ${' '}
      ${undefined}   | ${'default'} | ${'default'}
      ${null}        | ${'default'} | ${'default'}
    `(
      'rval($value) should return $expected',
      ({ value, defaultValue, expected }) => {
        expect(rval(value, defaultValue)).toEqual(expected);
      }
    );
  });

  describe('rval with undefined values', () => {
    it.each`
      value        | defaultValue | expected
      ${undefined} | ${undefined} | ${'Value is required but found undefined'}
      ${null}      | ${undefined} | ${'Value is required but found null'}
    `('rval($value) should throw $expected', ({ value, expected }) => {
      expect(() => rval(value)).toThrowError(expected);
      expect(() => rval(value)).toThrowError(RequiredValueError);
    });
  });
});
