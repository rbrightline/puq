import { join } from 'path';
import { mkdir } from '../../src/index.js';

describe('mkdir', () => {
  it('should create directories', async () => {
    await mkdir(join('data', 'first', 'second', 'third', 'fourth'));
  });
});
