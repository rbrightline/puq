import { join } from 'path';
import { readJSONFile, scope } from '../src/index.js';
import { mkdir, rm, writeFile } from 'fs/promises';

describe('readJSONFile: read file and parse to json', () => {
  const rootdir = join(__dirname, 'data', 'readJSONFile');
  const resolve = scope(rootdir);
  const filepath = resolve(rootdir, 'file.json');
  const jsonContent = { some: 'some' };

  beforeAll(async () => {
    await mkdir(rootdir, { recursive: true });
    await writeFile(filepath, JSON.stringify(jsonContent));
  });

  afterAll(async () => {
    await rm(rootdir, { recursive: true });
  });

  it('should read the json file', async () => {
    const content = await readJSONFile(filepath);
    expect(content).toEqual(jsonContent);
  });
});
