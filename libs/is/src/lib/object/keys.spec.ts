import { keys } from './keys.js';

describe('keys: get the keys of class, object, array, and string', () => {
  class A {
    a: any;
    b: any;
  }

  it.each`
    value      | expected
    ${'12'}    | ${['0', '1']}
    ${A}       | ${['a', 'b']}
    ${new A()} | ${['a', 'b']}
    ${[1, 2]}  | ${['0', '1']}
  `('keys($value) should return $expected', ({ value, expected }) => {
    expect(keys(value)).toEqual(expected);
  });
});
