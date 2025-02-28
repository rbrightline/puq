import { fail } from 'assert';
import { createThrowers } from './create-throwers.js';
import { ErrorCode } from './error-code.js';

describe('createThrowers', () => {
  const throwsers = createThrowers();

  it('should create all throwsers', () => {
    Object.values(ErrorCode)
      .filter((e) => typeof e === 'string')
      .forEach((e) => {
        if ((throwsers as any)[e]) return;
        fail(`${e} is not mapped`);
      });
  });

  it('should throw the right code and message', () => {
    Object.entries(throwsers).forEach(([errorName, thrower]) => {
      expect(thrower).toThrowError(
        (ErrorCode as any)[(ErrorCode as any)[errorName]]
      );
    });
  });
});
