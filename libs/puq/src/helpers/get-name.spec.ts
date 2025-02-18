import { describe } from 'node:test';
import { getName } from './get-name';

describe('getName', () => {
  it('should get name', () => {
    expect(getName('/some/some')).toEqual('some');
  });
});
