import { mkdir, rm } from 'fs/promises';
import { dirs, scope } from '../src/index.js';
import { join } from 'path';

describe('dirs: list all directories', () => {
  const rootdir = join(__dirname, 'data', 'dirs');
  const resolve = scope(rootdir);

  const testDirs = ['d1', 'd2', 'd3'].sort();
  const testSubDirs = ['d3\\d1', 'd3\\d2', 'd3\\d3'].sort();
  const allDirs = [testDirs, testSubDirs].flat();

  beforeAll(async () => {
    for (const d of allDirs) {
      const resolvedPath = resolve(__dirname, 'data', 'dirs', d);
      await mkdir(resolvedPath, { recursive: true });
    }
    // Setup
  });

  afterAll(async () => {
    await rm(resolve(__dirname, 'data', 'dirs'), { recursive: true });
  });

  it('should list dirs under the root directory', async () => {
    expect(await dirs(rootdir)).toEqual(testDirs);
  });

  it('should list dirs recursively under the root directory', async () => {
    expect(await dirs(rootdir, { recursive: true })).toEqual(allDirs);
  });
});
