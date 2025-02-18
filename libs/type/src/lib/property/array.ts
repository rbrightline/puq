import { CommonOptions } from './common.js';

export type __ArrayOptions<P> = {
  type: 'array';
  items: P;
  minSize?: number;
  maxSize?: number;
  default?: any[];
  example?: any[];
  examples?: any[][];
  isJSON?: boolean;
};

export type ArrayOptions<P> = CommonOptions & __ArrayOptions<P>;
