import { join } from 'path';
import { mkdir, scope } from '../../src/index.js';
import { rm } from '../../src/lib/rm.js';

describe('mkdir', () => {
  const resolve = scope(join(__dirname, 'data'));
  const filepath = resolve(
    __dirname,
    'data',
    'first',
    'second',
    'third',
    'fourth'
  );

  afterAll(async () => {
    rm(resolve(__dirname, 'data'), { recursive: true });
  });

  it('should create directories', async () => {
    await mkdir(filepath);
  });
});
