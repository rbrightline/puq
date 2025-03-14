/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Type } from '../utils/type.js';
import type { CommonOptions } from './common.js';

export type __ObjectOptions = {
  type: 'object';

  /**
   * Target DTO class
   * @returns
   */
  target: string | (() => Type);
};

export type ObjectOptions<T = any> = Readonly<
  CommonOptions<T> & __ObjectOptions
>;
