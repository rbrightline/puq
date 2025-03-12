import { filesOf } from './files-of.js';
describe('__dirname', () => {
  it('should return the dirname', () => {
    expect(filesOf('api')).toEqual('');
  });
});
