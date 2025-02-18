import { KeyOf } from './key-of.js';

export type PickRequired<T, R extends KeyOf<T>> = Omit<T, R> &
  Required<Pick<T, R>>;
