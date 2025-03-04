import { join } from 'path';
import { scope } from './scope.js';
import { mkdir, rm, writeFile } from 'fs/promises';
import { files } from './files.js';

describe('files: list all files in the directory recursively (optional)', () => {
  const rootDirectory = join(__dirname, 'temp', 'files');
  const __resolve = scope(rootDirectory);
  const resolve = (...args: string[]) => __resolve(rootDirectory, ...args);

  const testFiles = [
    'sample/dto/create-sample.dto.ts',
    'sample/dto/update-sample.dto.ts',
    'sample/entity/sample.entity.ts',
    'sample/sample.controller.ts',
    'sample/sample.module.ts',
  ].map((e) => resolve(e));

  beforeAll(async () => {
    await mkdir(resolve(''), { recursive: true });
    await mkdir(resolve('sample/dto'), { recursive: true });
    await mkdir(resolve('sample/entity'), { recursive: true });
    await Promise.all(
      testFiles.map((testFilePath) => writeFile(resolve(testFilePath), '')),
    );
  });

  afterAll(async () => {
    await rm(resolve(), { recursive: true });
  });

  it('should find files', async () => {
    const foundFiles = await files(resolve(), { recursive: true });
    expect(foundFiles.map((filepath) => resolve(filepath))).toEqual(
      testFiles.map((filepath) => resolve(filepath)),
    );
  });

  it('should find files with absolutepath', async () => {
    const foundFiles = await files(resolve(), { recursive: true });
    expect(foundFiles.map((filepath) => resolve(filepath))).toEqual(
      testFiles.map((filepath) => resolve(filepath)),
    );
  });
});
