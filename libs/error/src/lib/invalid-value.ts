import { ErrorCode } from './error-codes.js';
import { ErrorMetadata, PuqError } from './puq-error.js';

export class InvalidValueError extends PuqError {
  constructor(message = 'INVALID_VALUE', metadata?: ErrorMetadata) {
    super(ErrorCode.INVALID_VALUE, message, metadata);
  }
}
