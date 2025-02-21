import {
  mustHaveValidOperator,
  mustHaveValidPropertyName,
  mustHaveValidQuery,
} from './validate-where-query-string.js';

describe('valdiateWhereQueryString', () => {
  it('should validate query', () => {
    expect(mustHaveValidQuery('::valid')).toEqual(true);
    expect(mustHaveValidQuery('::1')).toEqual(true);
    expect(mustHaveValidQuery('::some')).toEqual(true);
    expect(() => mustHaveValidQuery('::some,')).toThrowError();
  });

  it('should valiate query operators', () => {
    expect(mustHaveValidOperator('::eq::')).toEqual(true);
    expect(mustHaveValidOperator('::neq::')).toEqual(true);
    expect(mustHaveValidOperator('::cn::')).toEqual(true);
    expect(mustHaveValidOperator('::ncn::')).toEqual(true);
    expect(mustHaveValidOperator('::mt::')).toEqual(true);
    expect(mustHaveValidOperator('::lt::')).toEqual(true);
    expect(mustHaveValidOperator('::mte::')).toEqual(true);
    expect(mustHaveValidOperator('::lte::')).toEqual(true);
  });

  it('shoudl validate property name', () => {
    expect(mustHaveValidPropertyName('id::', ['id', 'name'])).toEqual(true);
    expect(mustHaveValidPropertyName('id::some', ['id', 'name'])).toEqual(true);
    expect(mustHaveValidPropertyName('id::some', ['id', 'name'])).toEqual(true);
    expect(() =>
      mustHaveValidPropertyName('::id::', ['id', 'name'])
    ).toThrowError();
  });
});
