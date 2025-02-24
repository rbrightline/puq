import { ErrorCode } from './error-codes.js';

export type ErrorMetadata = Record<string, unknown>;

export class PuqError extends Error {
  public readonly code: ErrorCode;
  public readonly metadata?: ErrorMetadata;

  constructor(code: ErrorCode, message: string, metadata?: ErrorMetadata) {
    super(message);
    this.code = code;
    this.metadata = metadata;

    // Fix prototype chain for proper instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture the stack trace (Node.js and Chrome V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
