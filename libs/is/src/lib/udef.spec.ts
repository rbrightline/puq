import { udef } from './udef.js';
describe('udef: check the value is not defined', () => {
  describe('udef with udefined values', () => {
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
    `('udef($value) should return $expected', ({ value, expected }) => {
      expect(udef(value)).toEqual(expected);
    });
  });

  describe('udef with undefined values', () => {
    it.each`
      value        | expected
      ${undefined} | ${true}
      ${null}      | ${true}
    `('udef($value) should throw $expected', ({ value, expected }) => {
      expect(udef(value)).toEqual(expected);
    });
  });
});
