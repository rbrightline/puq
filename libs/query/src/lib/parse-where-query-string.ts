import { ARRAY_DELIMITER, OBJECT_PROPERTY_DELIMITER } from './delimiter.js';
import type { WhereOption } from './where.js';

export function parseWhereQueryString(queryString: string): WhereOption[] {
  return queryString.split(ARRAY_DELIMITER).map((e) => {
    const [property, operator, query] = e.split(OBJECT_PROPERTY_DELIMITER);

    return {
      property,
      operator,
      query,
    } as WhereOption;
  });
}
