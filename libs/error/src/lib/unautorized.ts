import { ErrorCode } from './error-codes.js';
import { ErrorMetadata, PuqError } from './puq-error.js';

export class UnautorizedError extends PuqError {
  constructor(message = 'UNAUTORIZED', metadata?: ErrorMetadata) {
    super(ErrorCode.UNAUTORIZED, message, metadata);
  }
}
