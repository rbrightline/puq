import type { ErrorCode } from './error-code.js';
import type { ErrorMetadata } from './error-metadata.js';

/**
 * Error class to create errors
 */
export class BaseError extends Error {
  /**
   * Unique error code to identify the cause of the error
   */
  public readonly code: ErrorCode;

  /**
   * Metadata to clearify the cuase
   */
  public readonly metadata?: ErrorMetadata;

  constructor(code: ErrorCode, message: string, metadata?: ErrorMetadata) {
    super(message);
    this.code = code;
    this.metadata = metadata;
    this.cause = this.metadata?.cause;

    // Fix prototype chain for proper instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture the stack trace (Node.js and Chrome V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
