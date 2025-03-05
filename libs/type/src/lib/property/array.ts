import type { CommonOptions } from './common.js';

/**
 * Array property options
 */
export type __ArrayOptions<P> = {
  /**
   * Property type
   */
  type: 'array';

  /**
   * Items options
   */
  items: Readonly<P>;

  /**
   * Maximum allowed size of the array
   */
  minSize?: number;

  /**
   * Minimum allowed size of the array
   */
  maxSize?: number;

  /**
   * Check the array has unique items
   */
  uniqueItems?: boolean;
};

export type ArrayOptions<P> = Readonly<
  CommonOptions<unknown[]> & __ArrayOptions<P>
>;
