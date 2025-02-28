import { BaseError } from './base-error.js';
import { ErrorCode } from './error-code.js';
import { ErrorMetadata } from './error-metadata.js';
import { ErrorThrower } from './error-thrower.js';

/**
 * Create a function that always throws the desired error code and error message
 * @param code
 * @param message
 * @returns
 */
export function createThrower(
  code: ErrorCode,
  message = ErrorCode[code]
): ErrorThrower {
  return function throwError(
    errorMessage = message,
    metadata?: ErrorMetadata
  ): never {
    throw new BaseError(code, errorMessage, metadata);
  };
}
