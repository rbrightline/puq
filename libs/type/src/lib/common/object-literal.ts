import type { Key } from './key.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SomeRecord } from './some-record.js';

/**
 * Empty object type
 * @deprecated use {@link SomeRecord} instead
 */
export type ObjectLiteral<V = unknown> = {
  [key: Key]: V;
};
