import { create } from './create.js';

describe('create: create class', () => {
  class A {
    a = 100;
  }
  it.each`
    value | expected
    ${A}  | ${{ a: 100 }}
  `('create($value) should return $expected', ({ value, expected }) => {
    expect(create(value)).toEqual(expected);
  });
});
