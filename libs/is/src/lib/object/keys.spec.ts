import { keys } from './keys.js';

describe('keys', () => {
  it('should extract the keys', () => {
    class A {
      some = 'some';
      other = 'other';
    }

    expect(keys(new A())).toEqual(['some', 'other']);
  });
});
