import { Controller } from '../controller/controller.js';
import { FindAll } from './find-all.js';

// - [ ] Methods should get the entity class from the controller
describe('FindAll', () => {
  it('should initialize', () => {
    class Sample {
      id: number;
    }
    @Controller(() => Sample)
    class SampleController {
      @FindAll()
      some() {
        return 'some';
      }
    }
  });
});
