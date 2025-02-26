import { RequiredValueError } from '@puq/error';
import { rval } from './rval.js';
describe('rval: check the value is defined or throw error', () => {
  describe('rval with defined values', () => {
    it.each`
      value          | expected
      ${''}          | ${''}
      ${'some'}      | ${'some'}
      ${' '}         | ${' '}
      ${String()}    | ${''}
      ${String('')}  | ${''}
      ${String(' ')} | ${' '}
    `('rval($value) should return $expected', ({ value, expected }) => {
      expect(rval(value)).toEqual(expected);
    });
  });

  describe('rval with undefined values', () => {
    it.each`
      value        | expected
      ${undefined} | ${'Value is required but found undefined'}
      ${null}      | ${'Value is required but found null'}
    `('rval($value) should throw $expected', ({ value, expected }) => {
      expect(() => rval(value)).toThrowError(expected);
      expect(() => rval(value)).toThrowError(RequiredValueError);
    });
  });
});
