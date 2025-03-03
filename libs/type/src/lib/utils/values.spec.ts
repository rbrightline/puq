import { values } from './values.js';

describe('values', () => {
  it('should extract the keys', () => {
    class A {
      some = 'some1';
      other = 'other1';
    }

    expect(values(new A())).toEqual(['some1', 'other1']);
  });
});
