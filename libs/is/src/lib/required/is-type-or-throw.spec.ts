import { Some } from '@puq/type';
import { isStringOrThrow } from './is-type-or-throw.js';

describe('rtype(value): check the values or throw error', () => {
  describe('rstr(value): check the value is string', () => {
    let value: Some = 100;
    if (isStringOrThrow(value)) {
      value;
    }
    console.log(value);
  });
});
