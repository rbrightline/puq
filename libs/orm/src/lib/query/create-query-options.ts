import type { BaseModel, Type } from '@puq/type';

export type CreateQueryOptions<T extends BaseModel> = {
  /**
   * Entity class
   */
  entity: Type<T>;
  /**
   * Maximum columns to select
   */
  maxSelectSize?: number;

  /**
   * Default take (limit) value
   */
  defaultTake?: number;
  /**
   * maximum take (limit) value
   */
  maxTake?: number;

  /**
   * is `select` required
   */
  isSelectRequired?: boolean;
};
