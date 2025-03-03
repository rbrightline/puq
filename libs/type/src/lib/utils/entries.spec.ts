import { entries } from './entries.js';

describe('entries', () => {
  it('should extract the entries', () => {
    class A {
      some = 'some';
      other = 'other';
    }

    expect(entries(new A())).toEqual([
      ['some', 'some'],
      ['other', 'other'],
    ]);
  });
});
