import { ErrorCode } from './error-codes.js';
import { ErrorMetadata, PuqError } from './puq-error.js';

export class RequiredValueError extends PuqError {
  constructor(message = 'REQURIED_VALUE', metadata?: ErrorMetadata) {
    super(ErrorCode.REQURIED_VALUE, message, metadata);
  }
}
