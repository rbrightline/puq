import { join } from 'path';
import { renameFile } from '../../src/index.js';
import { rm, writeFile } from 'fs/promises';
import { files } from '@puq/fs';

describe('renameFile', () => {
  const testFiles = ['sample.dto.ts', 'sample.entity.ts', 'sample.view.ts'];
  const testTemplateFiles = [
    '__fileName__.dto.ts.template',
    '__fileName__.entity.ts.template',
    '__fileName__.view.ts.template',
  ];

  async function remvoeFiles() {
    await Promise.all(
      testTemplateFiles.map((filename) => rm(join(__dirname, 'data', filename)))
    );
  }

  async function createFiles() {
    await Promise.all(
      testFiles.map((filename) =>
        writeFile(join(__dirname, 'data', filename), '')
      )
    );
  }

  beforeAll(async () => {
    await createFiles();
  });

  afterAll(async () => {
    await remvoeFiles();
  });

  it('should rename file', async () => {
    await renameFile({
      directory: 'data',
      expression: '^.*.ts$',
      suffix: '.template',
      from: 'sample',
      to: '__fileName__',
    });

    const foundFiles = await files(join(__dirname, 'data'));

    testTemplateFiles.forEach((filename) => {
      expect(foundFiles.includes(filename)).toBeTruthy();
    });
  });
});
