import { ErrorCode } from './error-codes.js';
import { ErrorMetadata, PuqError } from './puq-error.js';

export class AccessDeniedError extends PuqError {
  constructor(message = 'ACCESS_DENIED', metadata?: ErrorMetadata) {
    super(ErrorCode.ACCESS_DENIED, message, metadata);
  }
}
