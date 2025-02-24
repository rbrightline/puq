import { mkdir, writeFile } from 'fs/promises';
import { readFile } from '../../src/index.js';
import { join } from 'path';

describe('readFile', () => {
  const root = join(__dirname, 'data', 'some', 'other');
  beforeAll(async () => {
    await mkdir(root, { recursive: true });
    await writeFile(join(root, 'file.ts'), 'export const hello = "hello";');
  });

  afterAll(async () => {
    // await rm(join(__dirname, 'data'), { recursive: true });
  });

  it('should read file', async () => {
    const fileContent = await readFile('file.ts');
    const textContent = fileContent.toString();
    expect(textContent).toEqual('export const hello = "hello";');
  });
});
