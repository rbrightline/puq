import { writeFile } from 'fs/promises';
import { join } from 'path';
import { files, mkdir, rm, scope } from '../../src/index.js';

describe('files', () => {
  const resolve = scope(join(__dirname, 'data'));

  const testDirs = ['dir 1', 'dir 2', 'dir 3'];
  const testFiles = ['file1.txt'];

  beforeAll(async () => {
    const createTestDirs = testDirs.map(async (e) => {
      try {
        await mkdir(resolve(__dirname, 'data', e));
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
    const deleteFiles = [...testDirs, ...testFiles].map((filename) =>
      rm(resolve(__dirname, 'data', filename), { recursive: true })
    );
    await Promise.all(deleteFiles);
  });

  it('should list all files', async () => {
    expect(await files(resolve(__dirname, 'data'))).toEqual(testFiles);
  });
});
