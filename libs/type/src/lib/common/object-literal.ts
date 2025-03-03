/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Key } from './key.js';
import type { SomeRecord } from './some-record.js';

/**
 * @deprecated use {@link SomeRecord} instead
 */
export type ObjectLiteral<V = unknown> = {
  [key: Key]: V;
};
