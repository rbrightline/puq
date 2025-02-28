import { BaseError, ErrorCode } from '@puq/error';
import { rval } from './rval.js';
import { fail } from 'assert';
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
      ${undefined} | ${undefined} | ${ErrorCode.RequiredFieldMissing}
      ${null}      | ${undefined} | ${ErrorCode.RequiredFieldMissing}
    `('rval($value) should throw $expected', ({ value, expected }) => {
      try {
        rval(value);
        fail(`rval(${value}) should fail!`);
      } catch (err) {
        const e = err as BaseError;
        expect(e.code).toEqual(ErrorCode.RequiredFieldMissing);
        expect(e.message).toEqual(ErrorCode[ErrorCode.RequiredFieldMissing]);
      }
    });
  });
});
