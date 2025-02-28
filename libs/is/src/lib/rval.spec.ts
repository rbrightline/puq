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
      ${undefined} | ${undefined} | ${'value is not defined: undefined'}
      ${null}      | ${undefined} | ${'value is not defined: null'}
    `('rval($value) should throw $expected', ({ value, expected }) => {
      expect(() => rval(value)).toThrowError(expected);
      expect(() => rval(value)).toThrowError(expected);
    });
  });
});
