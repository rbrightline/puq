import { ErrorCode } from './error-codes.js';
import { ErrorMetadata, PuqError } from './puq-error.js';

export class DirectoryNotFoundError extends PuqError {
  constructor(message = 'DIRECTORY_NOT_FOUND', metadata?: ErrorMetadata) {
    super(ErrorCode.DIRECTORY_NOT_FOUND, message, metadata);
  }
}
