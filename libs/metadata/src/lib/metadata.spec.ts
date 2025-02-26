import { metadata } from './read.js';

describe('metadata', () => {
  it('should work', () => {
    expect(metadata()).toEqual('metadata');
  });
});
