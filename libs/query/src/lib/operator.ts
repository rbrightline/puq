/* eslint-disable  spellcheck/spell-checker */
export enum QueryOperator {
  EQUAL = 'eq',
  CONTAIN = 'cn',
  START_WITH = 'sw',
  END_WITH = 'ew',
  IS_IN = 'ii',
  MORE_THAN = 'mt',
  LESS_THAN = 'lt',
  MORE_THAN_OR_EQUAL = 'mte',
  LESS_THAN_OR_EQUAL = 'lte',
  BEFORE_DATE = 'bd',
  AFTER_DATE = 'ad',
  BEFORE_DATE_OR_EQUAL = 'bde',
  AFTER_DATE_OR_EQUAL = 'ade',
  NOT_EQUAL = 'neq',
  NOT_CONTAIN = 'ncn',
  NOT_START_WITH = 'nsw',
  NOT_END_WITH = 'new',
  NOT_IS_IN = 'nii',
}

export const QueryOperators = Object.values(QueryOperator);
