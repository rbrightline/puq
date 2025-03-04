import { BaseError, ErrorCode } from '@puq/error';
import { notEmptyOrThrow } from './not-empty-or-throw.js';
import { fail } from 'assert';

describe('notEmptyOrThrow: not empty check', () => {
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
  `('should notEmptyOrThrow($value) should throw', ({ value }) => {
    try {
      notEmptyOrThrow(value);
      fail(`notEmptyOrThrow(${value}) should throw errror`);
    } catch (error: any) {
      const e = error as BaseError;
      expect(e.code).toEqual(ErrorCode.EmptyField);
      expect(e.message).toEqual(ErrorCode[ErrorCode.EmptyField]);
      expect((e.metadata?.data as any)?.['params']).toEqual([value, undefined]);
    }
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
  `('should notEmptyOrThrow($value) should throw', ({ value }) => {
    expect(notEmptyOrThrow(value, 'some')).toEqual('some');
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
  `(
    'should notEmptyOrThrow($value) should return true',
    ({ value, expected }) => {
      expect(notEmptyOrThrow(value)).toEqual(expected);
    },
  );
});
