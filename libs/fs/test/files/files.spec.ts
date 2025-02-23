import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { files } from '../../src/index.js';

describe('files', () => {
  const testDirs = ['dir 1', 'dir 2', 'dir 3'];
  const testFiles = ['file1.txt'];

  beforeAll(async () => {
    const createTestDirs = testDirs.map(async (e) => {
      try {
        await mkdir(join(__dirname, 'data', e));
      } catch (err) {
        //
      }
    });

    const createTestFiles = testFiles.map(
      async (e) => await writeFile(join(__dirname, 'data', e), '')
    );

    await Promise.all(createTestDirs);
    await Promise.all(createTestFiles);
  });

  afterAll(async () => {
    const deleteFiles = [...testDirs, ...testFiles].map((filename) =>
      rm(join('data', filename), { recursive: true })
    );
    await Promise.all(deleteFiles);
  });

  it('should list all files', async () => {
    expect(await files(join(__dirname, 'data'))).toEqual(testFiles);
  });
});
