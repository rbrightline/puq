import { ErrorCode } from './error-codes.js';
import { ErrorMetadata, PuqError } from './puq-error.js';

export class OfflineError extends PuqError {
  constructor(message = 'OFFLINE', metadata?: ErrorMetadata) {
    super(ErrorCode.OFFLINE, message, metadata);
  }
}
