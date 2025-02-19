import { CommonOptions } from './common.js';

export type __ArrayOptions<P> = {
  type: 'array';
  items: P;
  minSize?: number;
  maxSize?: number;
};

export type ArrayOptions<P> = Readonly<
  CommonOptions<any[]> & __ArrayOptions<P>
>;
