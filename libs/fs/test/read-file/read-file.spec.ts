import { mkdir, readFile, scope } from '../../src/index.js';
import { join } from 'path';
import { rm } from '../../src/lib/rm.js';
import { writeFile } from 'fs/promises';

describe('readFile', () => {
  const resolve = scope(join(__dirname, 'data'));
  const root = resolve(__dirname, 'data');
  const fileDirectory = resolve(root, 'some', 'other');

  beforeAll(async () => {
    await mkdir(fileDirectory);
    await writeFile(
      resolve(fileDirectory, 'file.ts'),
      'export const hello = "hello";'
    );
  });

  afterAll(async () => {
    await rm(resolve(__dirname, 'data'), { recursive: true });
  });

  it('should read file', async () => {
    const fileContent = await readFile(resolve(__dirname, 'data', 'file.ts'), {
      recursive: true,
    });
    const textContent = fileContent.toString();
    expect(textContent).toEqual('export const hello = "hello";');
  });
});
