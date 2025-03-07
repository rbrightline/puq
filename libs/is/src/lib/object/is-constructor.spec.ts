import { isConstructor } from './is-constructor.js';
describe('isConstructor: check the value is a constructor', () => {
  class A {}
  it.each`
    value         | expected
    ${A}          | ${true}
    ${() => ({})} | ${false}
    ${''}         | ${false}
    ${1}          | ${false}
    ${null}       | ${false}
    ${undefined}  | ${false}
  `('isConstructor($value) should return $expected', ({ value, expected }) => {
    expect(isConstructor(value)).toEqual(expected);
  });
});
