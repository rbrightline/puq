/**
 * Error metadata to improve debugging
 */
export type ErrorMetadata = {
  /**
   * provide the cause of the error
   */
  cause?: unknown;

  /**
   * Any relative data to improve debugging
   */
  data?: unknown;
};
