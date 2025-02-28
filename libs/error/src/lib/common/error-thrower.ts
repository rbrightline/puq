import { ErrorMetadata } from './error-metadata.js';

/**
 * Error thrower function type
 */
export type ErrorThrower = (
  message?: string,
  metadata?: ErrorMetadata
) => never;
