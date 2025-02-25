import { dirs, mkdir, rm, scope, writeFile } from './../../src/index.js';
import { join } from 'path';

describe('dirs(filepath): list all directories', () => {
  const resolve = scope(join(__dirname, 'data'));
  const testDirs = ['dir 1', 'dir 2', 'dir 3'];
  const testFiles = ['file1.txt'];

  beforeAll(async () => {
    const createTestDirs = testDirs.map(async (e) => {
      try {
        return await mkdir(resolve(__dirname, 'data', e));
      } catch (err) {
        //
      }
    });

    const createTestFiles = testFiles.map(
      async (e) => await writeFile(resolve(__dirname, 'data', e), '')
    );

    await Promise.all(createTestDirs);
    await Promise.all(createTestFiles);
  });

  afterAll(async () => {
    await rm(resolve(__dirname, 'data'), { recursive: true });
  });

  it('should list all directories recursively', async () => {
    expect(await dirs(resolve(__dirname, 'data'))).toEqual(testDirs);
  });
});
