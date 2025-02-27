import { join } from 'path';
import { findFile, scope } from '../src/index.js';
import { mkdir, rm, writeFile } from 'fs/promises';

describe('findFile: find file by filename under the directory', () => {
  const rootdir = join(__dirname, 'data', 'findFile');
  const resolve = scope(rootdir);

  //   Find the file.ts file
  const testFiles = ['d1/d2/d3/file.ts', 'd1/some.ts', 'd3/other.ts'];

  beforeAll(async () => {
    for (const f of testFiles) {
      const resolvedFilePath = resolve(rootdir, f);
      await mkdir(join(resolvedFilePath, '..'), { recursive: true });
      await writeFile(resolvedFilePath, resolvedFilePath);
    }
  });

  afterAll(async () => {
    await rm(rootdir, { recursive: true });
  });

  it('should find file', async () => {
    expect(
      await findFile(join(rootdir, 'file.ts'), { recursive: true })
    ).toEqual(resolve(rootdir, testFiles[0]));
  });
});
