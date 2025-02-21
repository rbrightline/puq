/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryOperator } from './operator.js';

export type WhereOption<T = any, Query = any> = {
  /**
   * Property name
   */
  property: keyof T;

  /**
   * Query operator
   */
  operator: QueryOperator;

  /**
   * Query string
   */
  query: Query;
};
