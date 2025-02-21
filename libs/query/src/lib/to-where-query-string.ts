import { ARRAY_DELIMETER, OBJECT_PROPERTY_DELIMETER } from './delimeter.js';
import { WhereOption } from './where.js';

/**
 * Transform the query objects into url query string
 * @returns
 */
export function toWhereQueryString<T>(queryObjects: WhereOption<T>[]): string {
  return queryObjects
    .map((e) => {
      return [e.property, e.operator, e.query].join(OBJECT_PROPERTY_DELIMETER);
    })
    .join(ARRAY_DELIMETER);
}
