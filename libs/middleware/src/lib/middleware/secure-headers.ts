import helmet, { type HelmetOptions } from 'helmet';

/**
 * Set common security headers
 * @param options - HelmetOptions
 * @returns
 */
export function secureHeaders(options?: HelmetOptions) {
  return helmet(options);
}
