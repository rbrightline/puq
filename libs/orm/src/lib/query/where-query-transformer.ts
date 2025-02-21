import { parseWhereQueryString, validateWhereQueryString } from '@puq/query';
import { Transform } from 'class-transformer';
import { createFindOperator } from './create-find-operator.js';
import { Keys } from '@puq/type';

export type WhereQueryTransformerOptions = {
  /**
   * Entity columns to be allowed to query
   */
  columns: Keys;
};

/**
 * Parse /?where=<property>:<operator>:<query>&...
 * @param options
 * @returns
 */
export function WhereQueryTransformer(columns: Keys): PropertyDecorator {
  return (t, p) => {
    Transform(async ({ value }) => {
      if (typeof value == 'string') {
        validateWhereQueryString(value, columns);
        const queryObjects = parseWhereQueryString(value);

        return queryObjects
          .map(async (e) => {
            return createFindOperator(e);
          })
          .reduce((p, c) => ({ ...p, ...c }), {});
      } else if (Array.isArray(value)) {
        if (value.every((e) => typeof e == 'string')) {
          return value.map((e) => {
            validateWhereQueryString(e, columns);

            const queryObjects = parseWhereQueryString(e);

            return queryObjects
              .map(async (e) => {
                return createFindOperator(e);
              })
              .reduce((p, c) => ({ ...p, ...c }), {});
          });
        }
      }
      return value;
    })(t, p);
  };
}
