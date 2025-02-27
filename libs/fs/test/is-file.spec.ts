import { join } from 'path';
import { isFile } from '../src/index.js';

describe('isDir: check the path is directory', () => {
  it('should check the path is dirctory or not', async () => {
    expect(await isFile(join(__dirname, 'data'))).toEqual(false);
    expect(await isFile(join(__dirname, 'is-dir.spec.ts'))).toEqual(true);
  });
});
