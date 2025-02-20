import { QueryOperator, WhereOption } from '@puq/type';
import { Transform } from 'class-transformer';

export type QueryString = `${string}:${QueryOperator}:${string}`;

export function parseQueryString(queryString: QueryString): WhereOption {
  const [property, operator, query] = queryString.split(':');
  return { property, operator, query } as WhereOption;
}
/**
 * Parse /?where=<property>:<operator>:<query>
 * @param options
 * @returns
 */
export function WhereTransformer(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value == 'string') {
        // string
        return [parseQueryString(value as QueryString)];
      } else if (Array.isArray(value)) {
        if (value.every((e) => typeof e == 'string')) {
          return value.map((e) => parseQueryString(e as QueryString));
        }
      }

      return value;
    })(t, p);
  };
}
