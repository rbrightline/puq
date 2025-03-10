import { ARRAY_DELIMITER, OBJECT_PROPERTY_DELIMITER } from './delimiter.js';
import type { WhereOption } from './where.js';

/**
 * Transform the query objects into url query string
 * @returns
 */
export function toWhereQueryString<T>(queryObjects: WhereOption<T>[]): string {
  return queryObjects
    .map((e) => {
      return [e.property, e.operator, e.query].join(OBJECT_PROPERTY_DELIMITER);
    })
    .join(ARRAY_DELIMITER);
}
