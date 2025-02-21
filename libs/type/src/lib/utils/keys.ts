/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyOf } from './key-of.js';

export type Keys<T = any> = KeyOf<T>[];

export function keys<T extends { [key: string]: any }>(instance: T): Keys<T> {
  return Object.keys(instance) as Keys<T>;
}
