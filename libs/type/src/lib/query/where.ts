import { QueryOperator } from './operator.js';

export type WhereOption = {
  property: string;
  operator: QueryOperator;
  query: string;
};
