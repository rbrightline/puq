import { resolve } from 'path';
import { cwd } from 'process';

describe('Entity generator', () => {
  it('should work', () => {
    const target = resolve(cwd(), 'sample/sample');

    console.log(target);
  });
});
