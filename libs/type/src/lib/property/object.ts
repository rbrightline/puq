import { Type } from '../utils/type.js';
import { CommonOptions } from './common.js';

export type __ObjectOptions = {
  type: 'object';
  target: () => Type;
};

export type ObjectOptions<T = any> = Readonly<
  CommonOptions<T> & __ObjectOptions
>;
