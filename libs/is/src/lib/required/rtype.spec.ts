import { None } from '@puq/type';
import { rstr } from './rtype.js';

describe('rtype(value): check the values or throw error', () => {
  describe('rstr(value): check the value is string', () => {
    let value: None = 100;
    if (rstr(value)) {
      value;
    }
    console.log(value);
  });
});
