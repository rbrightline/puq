import { writeFile } from 'fs/promises';
import { join } from 'path';
import { repalce } from '../../src/index.js';

describe('replace', () => {
  const root = join(__dirname, 'data');
  beforeAll(async () => {
    await writeFile(
      join(root, 'update-sample.dto.ts'),
      [
        '// SAMPLE ',
        "import { CreateSampleDto } from './create-sample.dto.ts'",
        'export class UpdateSampleDto  extends PartialType(CreateSampleDto) { ',
        '',
        '}',
      ].join('\n')
    );
    await writeFile(
      join(root, 'create-sample.dto.ts'),
      [
        '// SAMPLE ',
        'export class CreateSampleDto { ',
        '   sample: string;',
        '}',
      ].join('\n')
    );
  });

  afterAll(async () => {
    // await rm(join(root, 'create-sample.dto.ts'));
    // await rm(join(root, 'update-sample.dto.ts'));
  });

  it('should replace the content', async () => {
    await repalce({
      directory: root,
      expression: 'sample',
      from: ['Sample', 'sample\\.', 'sample', 'SAMPLE'],
      to: [
        '<%- className %>',
        '<%- fileName %>.',
        '<%- propertyName -%>',
        '<%- constantName %>',
      ],
    });
  });
});
