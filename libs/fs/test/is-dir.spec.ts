import { join } from 'path';
import { isDir } from '../src/index.js';

describe('isDir: check the path is directory', () => {
  it('should check the path is dirctory or not', async () => {
    expect(await isDir(join(__dirname, 'data'))).toEqual(true);
    expect(await isDir(join(__dirname, 'is-dir.spec.ts'))).toEqual(false);
  });
});
