import { Dto } from './dto.js';
describe('Dto', () => {
  it('should work', () => {
    @Dto()
    class Sample {}
  });
});
