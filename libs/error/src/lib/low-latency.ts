import { ErrorCode } from './error-codes.js';
import { ErrorMetadata, PuqError } from './puq-error.js';

export class LowLatencyError extends PuqError {
  constructor(message = 'LOW_LATENCY', metadata?: ErrorMetadata) {
    super(ErrorCode.LOW_LATENCY, message, metadata);
  }
}
