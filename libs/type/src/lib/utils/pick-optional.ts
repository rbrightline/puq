import { KeyOf } from './key-of.js';

export type PickOptional<T, R extends KeyOf<T>> = Omit<T, R> &
  Partial<Pick<T, R>>;
