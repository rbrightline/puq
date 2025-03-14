import { isString } from './is-type.js';

describe('isType', () => {
  it('should check types', () => {
    expect(isString(new String('SOme'))).toBe(true);
  });
});
