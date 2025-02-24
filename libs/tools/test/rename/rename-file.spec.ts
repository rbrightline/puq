import { join } from 'path';
import { rename } from '../../src/index.js';
import { rm, writeFile } from 'fs/promises';
import { files } from '@puq/fs';

describe('rename', () => {
  const root = join(__dirname, 'data');
  const testFiles = ['sample.dto.ts', 'sample.entity.ts', 'sample.view.ts'];
  const testTemplateFiles = [
    '__fileName__.dto.ts.template',
    '__fileName__.entity.ts.template',
    '__fileName__.view.ts.template',
  ];

  async function remvoeFiles() {
    await Promise.all(
      testTemplateFiles.map((filename) => rm(join(root, filename)))
    );
  }

  async function createFiles() {
    await Promise.all(
      testFiles.map((filename) => writeFile(join(root, filename), ''))
    );
  }

  beforeAll(async () => {
    await createFiles();
  });

  afterAll(async () => {
    await remvoeFiles();
  });

  it('should rename file', async () => {
    await rename({
      directory: root,
      expression: '^.*.ts$',
      suffix: '.template',
      from: ['sample'],
      to: ['__fileName__'],
    });

    const foundFiles = await files(root);

    testTemplateFiles.forEach((filename) => {
      expect(foundFiles.includes(filename)).toBeTruthy();
    });
  });
});
