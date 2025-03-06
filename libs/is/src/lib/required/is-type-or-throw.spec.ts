import { isStringOrThrow } from './is-type-or-throw.js';

describe('isStringOrThrow(value): check the values or throw error', () => {
  describe('Valid cases', () => {
    it.each`
      value    | expected
      ${''}    | ${''}
      ${'1'}   | ${'1'}
      ${'   '} | ${'   '}
    `(
      'isStringOrThrow($value) should return $expected',
      ({ value, expected }) => {
        expect(isStringOrThrow(value)).toEqual(expected);
      },
    );
  });
});
