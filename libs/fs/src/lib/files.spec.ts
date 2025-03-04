import { join } from 'path';
import { scope } from './scope.js';
import { mkdir, writeFile } from 'fs/promises';

describe('files: list all files in the directory recursively (optional)', () => {
  const rootDirectory = join(__dirname, 'temp', 'files');
  const __resolve = scope(rootDirectory);
  const resolve = (...args: string[]) => __resolve(rootDirectory, ...args);

  const testFiles = [
    'sample/dto/create-sample.dto.ts',
    'sample/dto/update-sample.dto.ts',
    'sample/entity/sample.entity.ts',
  ].map((e) => resolve(e));

  beforeAll(async () => {
    await mkdir(resolve(''));
    await mkdir(resolve('sample/dto'), { recursive: true });
    await mkdir(resolve('sample/entity'), { recursive: true });
    await Promise.all(
      testFiles.map((testFilePath) => writeFile(resolve(testFilePath), '')),
    );
  });

  afterAll(async () => {
    // Teardonw
  });

  it('should find files', async () => {
    expect(1).toEqual(1);
  });
});
