import { parseWhereQueryString } from '@puq/query';
import { Transform } from 'class-transformer';
import { createFindOperator } from './create-find-operator.js';

/**
 * Parse /?where=<property>:<operator>:<query>&...
 * @param options
 * @returns
 */
export function WhereQueryTransformer(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value == 'string') {
        const queryObjects = parseWhereQueryString(value);
        return queryObjects
          .map((e) => createFindOperator(e))
          .reduce((p, c) => ({ ...p, ...c }), {});
      } else if (Array.isArray(value)) {
        if (value.every((e) => typeof e == 'string')) {
          return value.map((e) => {
            const queryObjects = parseWhereQueryString(e);
            return queryObjects
              .map((e) => createFindOperator(e))
              .reduce((p, c) => ({ ...p, ...c }), {});
          });
        }
      }
      return value;
    })(t, p);
  };
}
