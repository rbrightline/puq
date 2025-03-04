import { notEmpty } from './not-empty.js';

describe('ne: check the value is not empty', () => {
  //
  describe('ne(empty-value) test', () => {
    it.each`
      value                  | expected
      ${undefined}           | ${false}
      ${null}                | ${false}
      ${''}                  | ${false}
      ${' '}                 | ${false}
      ${' '}                 | ${false}
      ${[]}                  | ${false}
      ${[undefined]}         | ${false}
      ${{}}                  | ${false}
      ${{ some: undefined }} | ${false}
      ${NaN}                 | ${false}
    `('ne($value) should return false', ({ value, expected }) => {
      expect(notEmpty(value)).toEqual(expected);
    });
  });

  //
  describe('ne(none-enmpty-value) test', () => {
    it.each`
      value                  | expected
      ${'some'}              | ${true}
      ${'some      '}        | ${true}
      ${['some', undefined]} | ${true}
      ${{ some: -1 }}        | ${true}
      ${-1}                  | ${true}
      ${500n}                | ${true}
      ${true}                | ${true}
      ${false}               | ${true}
    `('ne($value) should return true', ({ value, expected }) => {
      expect(notEmpty(value)).toEqual(expected);
    });

    //
  });

  //
});
