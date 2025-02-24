import { ErrorCode } from './error-codes.js';
import { ErrorMetadata, PuqError } from './puq-error.js';

export class FileNotFoundError extends PuqError {
  constructor(message = 'FILE_NOT_FOUND', metadata?: ErrorMetadata) {
    super(ErrorCode.FILE_NOT_FOUND, message, metadata);
  }
}
