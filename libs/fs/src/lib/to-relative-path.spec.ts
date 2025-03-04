import { normalize } from 'path';
import { toRelativePath } from './to-relative-path.js';

describe('toRelativePath: convert absolute path into relative path ', () => {
  describe('toRelativePath: valid cases', () => {
    it.each`
      rootPath      | childPath                 | expected
      ${'C://root'} | ${'C://root/child/child'} | ${'child/child'}
      ${'C://root'} | ${'C://root/child/child'} | ${'child/child'}
      ${'C://root'} | ${'C://root/some/other'}  | ${'some/other'}
      ${'root'}     | ${'root/some/other'}      | ${'some/other'}
      ${''}         | ${'root/some/other'}      | ${'root/some/other'}
      ${'.'}        | ${'root/some/other'}      | ${'root/some/other'}
      ${'/'}        | ${'root/some/other'}      | ${'root/some/other'}
      ${'\\'}       | ${'root/some/other'}      | ${'root/some/other'}
      ${'   '}      | ${'root/some/other'}      | ${'root/some/other'}
    `(
      'should output $expected from $options',
      ({ rootPath, childPath, expected }) => {
        expect(toRelativePath(rootPath, childPath)).toEqual(
          normalize(expected),
        );
      },
    );
  });

  describe('toRelativePath: invalid cases', () => {
    it.each`
      rootPath                | childPath
      ${'C://different-root'} | ${'C://root/child/child'}
    `(
      'should output $expected from $options',
      ({ rootPath, childPath, expected }) => {
        expect(() => toRelativePath(rootPath, childPath)).toThrowError(
          'The child path must start with the root path',
        );
      },
    );
  });
});
