import { files, scope } from '@puq/fs';
import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { rename } from './rename.js';
describe('rename: recursively rename files.', () => {
  const __root = join(__dirname, 'temp');
  const __resolve = scope(__root);
  const resolve = (...args: string[]) => __resolve(__root, ...args);

  const testFiles: string[] = [
    'sample/index.ts',
    'sample/entity/sample.entity.ts',
    'sample/dto/create-sample.dto.ts',
    'sample/dto/update-sample.dto.ts',
  ].map((e) => resolve(e));

  beforeAll(async () => {
    // Setup
    await mkdir(resolve(''), { recursive: true });
    await mkdir(resolve('sample/dto'), { recursive: true });
    await mkdir(resolve('sample/entity'), { recursive: true });
    await Promise.all(
      testFiles.map((testFilePath) => writeFile(testFilePath, '')),
    );
  });

  afterAll(async () => {
    await rm(resolve(''), { recursive: true });
  });

  it('should rename files', async () => {
    await rename({
      directory: resolve(__root, 'sample'),
      expression: '.ts',
      suffix: '.template',
      recursive: true,
    });

    const replacedFiles = await files(resolve(__root, 'sample'), {
      recursive: true,
    });

    expect(replacedFiles).toHaveLength(4);
  });
});
