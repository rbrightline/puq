import { join } from 'path';
import { findFiles, scope } from '../src/index.js';
import { mkdir, rm, writeFile } from 'fs/promises';

describe('findFiles: find file by filename under the directory', () => {
  const rootdir = join(__dirname, 'data', 'findFiles');
  const resolve = scope(rootdir);

  //   Find the file.ts file
  const testFiles = ['d1/d2/d3/file.ts', 'd1/some.ts', 'd3/other.ts'].sort();

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

  it('should find files', async () => {
    expect(
      await findFiles(join(rootdir, '\\.ts'), {
        recursive: true,
        fullpath: true,
      })
    ).toEqual(testFiles.map((e) => resolve(rootdir, e)));
  });
});
