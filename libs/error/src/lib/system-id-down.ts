import { ErrorCode } from './error-codes.js';
import { ErrorMetadata, PuqError } from './puq-error.js';

export class SystemIsDownError extends PuqError {
  constructor(message = 'SYSTEM_IS_DOWN', metadata?: ErrorMetadata) {
    super(ErrorCode.SYSTEM_IS_DOWN, message, metadata);
  }
}
