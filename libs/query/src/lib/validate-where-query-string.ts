import { OBJECT_PROPERTY_DELIMETER } from './delimeter.js';
import { QueryOperators } from './operator.js';

export function mustHaveValidOperator(queryString: string) {
  if (
    !new RegExp(
      `${OBJECT_PROPERTY_DELIMETER}(${QueryOperators.join(
        '|'
      )})${OBJECT_PROPERTY_DELIMETER}`
    ).test(queryString)
  )
    throw new Error(
      `Query operator must be one of ${QueryOperators.join(',')}`
    );

  return true;
}

export function mustHaveValidPropertyName(
  queryString: string,
  columns: (keyof any)[]
) {
  if (
    !new RegExp(`^(${columns.join('|')})${OBJECT_PROPERTY_DELIMETER}`).test(
      queryString
    )
  )
    throw new Error(`Query property must be one of ${columns.join(',')}`);

  return true;
}

export function mustHaveValidQuery(queryString: string) {
  if (
    !new RegExp(`${OBJECT_PROPERTY_DELIMETER}[a-zA-Z0-9 ]{1,}$`).test(
      queryString
    )
  )
    throw new Error('Invalid query');

  return true;
}

export function validateWhereQueryString(
  queryString: string,
  columns: (keyof any)[]
): true | never {
  mustHaveValidOperator(queryString);
  mustHaveValidPropertyName(queryString, columns);
  mustHaveValidQuery(queryString);
  return true;
}
