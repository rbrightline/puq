import { ARRAY_DELIMETER, OBJECT_PROPERTY_DELIMETER } from './delimeter.js';
import { WhereOption } from './where.js';

export function parseWhereQueryString(queryString: string): WhereOption[] {
  return queryString.split(ARRAY_DELIMETER).map((e) => {
    const [property, operator, query] = e.split(OBJECT_PROPERTY_DELIMETER);
    return {
      property,
      operator,
      query,
    } as WhereOption;
  });
}
