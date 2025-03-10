import type { Type } from '@puq/type';

export type CreateQueryOptions<Entity> = {
  /**
   * Entity class
   */
  entity: Type<Entity>;
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
