import { CommonOptions } from './common.js';

export type __ArrayOptions<P> = {
  type: 'array';
  items: P;

  /**
   * Maximumm allowed size of the array
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
