/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CommonOptions } from './common.js';

export type __ArrayOptions<P> = {
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
  CommonOptions<any[]> & __ArrayOptions<P>
>;
