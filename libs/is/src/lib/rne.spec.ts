import { RequiredValueError } from '@puq/error';
import { rne } from './rne.js';

describe('rne: not empty check', () => {
  it.each`
    value
    ${undefined}
    ${null}
    ${''}
    ${' '}
    ${' '}
    ${[]}
    ${[undefined]}
    ${{}}
    ${{ some: undefined }}
    ${NaN}
  `('should rne($value) should throw', ({ value }) => {
    expect(() => rne(value)).toThrowError(RequiredValueError);
  });

  it.each`
    value
    ${undefined}
    ${null}
    ${''}
    ${' '}
    ${' '}
    ${[]}
    ${[undefined]}
    ${{}}
    ${{ some: undefined }}
    ${NaN}
  `('should rne($value) should throw', ({ value }) => {
    expect(rne(value, 'some')).toEqual('some');
  });

  it.each`
    value                  | defaultValue | expected
    ${'some'}              | ${undefined} | ${'some'}
    ${'some      '}        | ${undefined} | ${'some      '}
    ${['some', undefined]} | ${undefined} | ${['some', undefined]}
    ${{ some: -1 }}        | ${undefined} | ${{ some: -1 }}
    ${-1}                  | ${undefined} | ${-1}
    ${500n}                | ${undefined} | ${500n}
    ${true}                | ${undefined} | ${true}
    ${false}               | ${undefined} | ${false}
  `('should rne($value) should return true', ({ value, expected }) => {
    expect(rne(value)).toEqual(expected);
  });
});
