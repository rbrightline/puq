import { BaseError } from './base-error.js';
import { ErrorCode } from './error-code.js';

describe('BaseError', () => {
  const code = ErrorCode.InvalidArray;
  const message = 'message';
  const metadata = { cause: 'cause' };
  const error = new BaseError(code, message, metadata);

  it('should have code', () => {
    expect(error.code).toEqual(code);
  });
  it('should have message', () => {
    expect(error.message).toEqual(message);
  });

  it('should have metadata', () => {
    expect(error.metadata).toEqual(metadata);
  });
});
