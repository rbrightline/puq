import { mkdir, rm, writeFile } from 'fs/promises';
import { files, scope } from '../src/index.js';
import { join } from 'path';

describe('files: list all files', () => {
  const rootdir = join(__dirname, 'data', 'files');
  const resolve = scope(rootdir);

  const testDirs = ['d1', 'd2', 'd3'].sort();
  const testSubDirs = ['d3\\d1', 'd3\\d2', 'd3\\d3'];
  const testFiles = [
    'root.ts',
    'd1\\file1.ts',
    'd2\\file2.ts',
    'd2\\file3.ts',
  ].sort();

  const allDirs = [testDirs, testSubDirs].flat();

  // Setup
  beforeAll(async () => {
    for (const d of allDirs) {
      const resolvedPath = resolve(rootdir, d);
      await mkdir(resolvedPath, { recursive: true });
    }

    for (const f of testFiles) {
      const resolvedPath = resolve(rootdir, f);
      await writeFile(resolvedPath, resolvedPath);
    }
  });

  afterAll(async () => {
    await rm(rootdir, { recursive: true });
  });

  it('should list files under the root directory', async () => {
    expect(await files(rootdir)).toEqual(['root.ts']);
  });

  it('should list files recursively under the root directory', async () => {
    expect(await files(rootdir, { recursive: true })).toEqual(testFiles);
  });
});
