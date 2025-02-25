import { join } from 'path';
import { findFile, mkdir, rm, scope } from '../../src/index.js';
import { writeFile } from 'fs/promises';

describe('findFile', () => {
  const resolve = scope(join(__dirname, 'data'));
  const root = resolve(__dirname, 'data', 'first', 'second', 'third');
  const filePath = resolve(root, 'file.ts');

  beforeAll(async () => {
    await mkdir(root);
    await writeFile(filePath, 'some');
  });

  afterAll(async () => {
    await rm(resolve(__dirname, 'data'));
  });

  it('should find file', async () => {
    const found = await findFile(resolve(__dirname, 'data', 'file.ts'), {
      recursive: true,
    });

    expect(found).toEqual(filePath);
  });
});
