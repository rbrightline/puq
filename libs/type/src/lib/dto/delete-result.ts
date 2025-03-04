import type { SomeRecord } from '../common/some-record.js';

/**
 * Http delete response body
 */
export type DeleteResult = {
  affected: number;
  data?: SomeRecord;
};
