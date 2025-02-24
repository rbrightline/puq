import { join } from 'path';
import { findFile } from '../../src/index.js';

describe('findFile', () => {
  it('shoudl find file', async () => {
    const found = await findFile(join(__dirname, 'data'), 'file.ts');

    expect(found).toEqual(
      join(__dirname, 'data', 'first', 'second', 'third', 'file.ts')
    );
  });
});
