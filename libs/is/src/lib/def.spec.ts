import { def } from './def.js';
describe('def: check the value is defined', () => {
  describe('def with defined values', () => {
    it.each`
      value          | expected
      ${''}          | ${true}
      ${'some'}      | ${true}
      ${' '}         | ${true}
      ${String()}    | ${true}
      ${String('')}  | ${true}
      ${-1}          | ${true}
      ${0}           | ${true}
      ${Date}        | ${true}
      ${true}        | ${true}
      ${false}       | ${true}
      ${94194727n}   | ${true}
      ${12124.12412} | ${true}
      ${12124.12412} | ${true}
      ${{}}          | ${true}
      ${[]}          | ${true}
      ${NaN}         | ${true}
    `('def($value) should return $expected', ({ value, expected }) => {
      expect(def(value)).toEqual(expected);
    });
  });

  describe('def with undefined values', () => {
    it.each`
      value        | expected
      ${undefined} | ${false}
      ${null}      | ${false}
    `('def($value) should throw $expected', ({ value, expected }) => {
      expect(def(value)).toEqual(expected);
    });
  });
});
