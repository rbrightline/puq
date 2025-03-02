/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * keyof T
 */
export type KeyOf<T> = keyof T;

export type Keys<T = any> = KeyOf<T>[];
