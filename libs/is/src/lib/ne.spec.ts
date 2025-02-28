import { ne } from './ne.js';

describe('ne: not empty check', () => {
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
  `('should ne($value) should return false', ({ value, expected }) => {
    expect(ne(value)).toEqual(expected);
  });
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
  `('should ne($value) should return true', ({ value, expected }) => {
    expect(ne(value)).toEqual(expected);
  });
});
