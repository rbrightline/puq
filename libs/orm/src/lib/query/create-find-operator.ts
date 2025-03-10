import type { WhereOption } from '@puq/query';
import type { FindOperator } from 'typeorm';
import { QueryOperator } from '@puq/query';
import {
  Equal,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

/**
 * Create a typeorm find operator from {@link WhereOption}
 * @param query - {@link WhereOption}
 * @returns - Typeorm find operator
 */
export function createFindOperator(
  query: WhereOption,
): Record<string, FindOperator<unknown>> {
  switch (query.operator) {
    case QueryOperator.EQUAL:
      return { [query.property]: Equal(query.query) };
    case QueryOperator.CONTAIN:
      return { [query.property]: ILike(`%${query.query}%`) };
    case QueryOperator.START_WITH:
      return { [query.property]: ILike(`${query.query}%`) };
    case QueryOperator.END_WITH:
      return { [query.property]: ILike(`%${query.query}`) };
    case QueryOperator.IS_IN:
      return { [query.property]: Equal(query.query) };
    case QueryOperator.MORE_THAN:
      return { [query.property]: MoreThan(query.query) };
    case QueryOperator.LESS_THAN:
      return { [query.property]: LessThan(query.query) };
    case QueryOperator.MORE_THAN_OR_EQUAL:
      return { [query.property]: MoreThanOrEqual(query.query) };
    case QueryOperator.LESS_THAN_OR_EQUAL:
      return { [query.property]: LessThanOrEqual(query.query) };
    case QueryOperator.AFTER_DATE:
      return { [query.property]: MoreThan(query.query) };
    case QueryOperator.BEFORE_DATE:
      return { [query.property]: LessThan(query.query) };
    case QueryOperator.AFTER_DATE_OR_EQUAL:
      return { [query.property]: MoreThanOrEqual(query.query) };
    case QueryOperator.BEFORE_DATE_OR_EQUAL:
      return { [query.property]: LessThanOrEqual(query.query) };
    case QueryOperator.NOT_EQUAL:
      return { [query.property]: Not(Equal(query.query)) };
    case QueryOperator.NOT_CONTAIN:
      return { [query.property]: Not(ILike(`%${query.query}%`)) };
    case QueryOperator.NOT_START_WITH:
      return { [query.property]: Not(ILike(`${query.query}%`)) };
    case QueryOperator.NOT_END_WITH:
      return { [query.property]: Not(ILike(`%${query.query}`)) };
    case QueryOperator.NOT_IS_IN:
      return { [query.property]: Not(Equal(query.query)) };
  }
}
