import { join } from 'path';
import { readYAMLFile, scope } from '../src/index.js';
import { mkdir, rm, writeFile } from 'fs/promises';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { dump } from 'js-yaml';

describe('readYAMLFile: read file and parse to json', () => {
  const rootdir = join(__dirname, 'data', 'readJSONFile');
  const resolve = scope(rootdir);
  const filepath = resolve(rootdir, 'file.yaml');
  const yamlContent = { some: 'some' };

  beforeAll(async () => {
    await mkdir(rootdir, { recursive: true });
    await writeFile(filepath, dump(yamlContent));
  });

  afterAll(async () => {
    await rm(rootdir, { recursive: true });
  });

  it('should read and parse the yaml file', async () => {
    const content = await readYAMLFile(filepath);
    expect(content).toEqual(yamlContent);
  });
});
