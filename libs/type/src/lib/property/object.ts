import { Type } from '../utils/type.js';
import { CommonOptions } from './common.js';

export type __ObjectOptions<T = any> = {
  type: 'object';
  target: () => Type;
  default?: T;
  example?: T;
  examples?: T[];
  isJSON?: boolean;
};

export type ObjectOptions<T = any> = CommonOptions & __ObjectOptions<T>;
