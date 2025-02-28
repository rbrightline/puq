import { ErrorCode } from './error-code.js';
import { createThrower } from './create-thrower.js';

describe('createErrorThrower: Create a function that throws desired error with the provided code and message', () => {
  it('should create error thrower', () => {
    expect(createThrower(ErrorCode.DIRECTORY_NOT_FOUND)).toThrowError(
      ErrorCode[ErrorCode.DIRECTORY_NOT_FOUND]
    );
  });
});
