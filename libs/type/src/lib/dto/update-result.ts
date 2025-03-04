import type { SomeRecord } from '../common/some-record.js';

export type UpdateResult = {
  affected: number;
  data?: SomeRecord;
};
