import { isNotDefined } from './is-not-defined.js';
describe('udef: check the value is not defined', () => {
  describe('udef(defined-value) ', () => {
    it.each`
      value          | expected
      ${''}          | ${false}
      ${'some'}      | ${false}
      ${' '}         | ${false}
      ${String()}    | ${false}
      ${String('')}  | ${false}
      ${-1}          | ${false}
      ${0}           | ${false}
      ${Date}        | ${false}
      ${true}        | ${false}
      ${false}       | ${false}
      ${94194727n}   | ${false}
      ${12124.12412} | ${false}
      ${12124.12412} | ${false}
      ${{}}          | ${false}
      ${[]}          | ${false}
      ${NaN}         | ${false}
    `('udef($value) should return false', ({ value, expected }) => {
      expect(isNotDefined(value)).toEqual(expected);
    });
  });

  describe('udef(undefiend-value)', () => {
    it.each`
      value        | expected
      ${undefined} | ${true}
      ${null}      | ${true}
    `('udef($value) should throw $expected', ({ value, expected }) => {
      expect(isNotDefined(value)).toEqual(expected);
    });
  });
});
