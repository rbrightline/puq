import type { BaseModel, PropertyDecoratorParam } from '@puq/type';
import type { CreateQueryOptions } from './create-query-options.js';
import { parseWhereQueryString, validateWhereQueryString } from '@puq/query';
import { Transform } from 'class-transformer';
import { createFindOperator } from './create-find-operator.js';
import { keys } from '@puq/is';
/**
 * Where query transformer
 * @param options
 * @returns
 */
export function WhereQueryTransformer<T extends BaseModel>(
  options: CreateQueryOptions<T>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    const columns = keys(options.entity);

    Transform(({ value }) => {
      if (typeof value == 'string') {
        validateWhereQueryString(value, columns);
        const queryObjects = parseWhereQueryString(value);

        return queryObjects
          .map((e) => {
            return createFindOperator(e);
          })
          .reduce((p1, c1) => ({ ...p1, ...c1 }), {});
      } else if (Array.isArray(value)) {
        if (value.every((e) => typeof e == 'string')) {
          return value.map((e) => {
            validateWhereQueryString(e, columns);

            const queryObjects = parseWhereQueryString(e);

            return queryObjects
              .map((e1) => {
                return createFindOperator(e1);
              })
              .reduce((p1, c1) => ({ ...p1, ...c1 }), {});
          });
        }
      }
      return value;
    })(...args);
  };
}
