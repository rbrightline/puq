import { entries } from './entries.js';

describe('entries(value): get entries of string, number, object, and array', () => {
  describe('entries(value-value) test', () => {
    //
    it.each`
      value                  | expected
      ${'ab'}                | ${[['0', 'a'], ['1', 'b']]}
      ${12}                  | ${[['0', '1'], ['1', '2']]}
      ${[]}                  | ${[]}
      ${[1]}                 | ${[['0', 1]]}
      ${{}}                  | ${[]}
      ${{ some: undefined }} | ${[['some', undefined]]}
    `('entries($value) should return $expected', ({ value, expected }) => {
      expect(entries(value)).toEqual(expected);
    });
    //
  });
  //

  describe('entries(invalid-value) test', () => {
    //
    it.each`
      value        | expected
      ${undefined} | ${'error'}
      ${null}      | ${'error'}
      ${true}      | ${'error'}
      ${false}     | ${'error'}
      ${NaN}       | ${'error'}
    `('entries($value) should return $expected', ({ value, expected }) => {
      expect(() => entries(value)).toThrowError();
    });
    //
  });

  //
});
