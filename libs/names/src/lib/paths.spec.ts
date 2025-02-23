import { describe, it, expect } from 'vitest';
import { paths, RestApiPaths } from './paths.js';

describe('restPaths', () => {
  it('should generate correct paths without prefix', () => {
    const name = 'category';
    const expected: RestApiPaths = {
      plural: 'categories',
      singular: 'category',
      id: 'category/:id',
      increment: 'category/:id/increment',
      decrement: 'category/:id/decrement',
      count: 'categories/count',
      relation: 'category/:id/:relationName',
      relationId: 'category/:id/:relationName/:relationId',
      file: 'category/:id/file',
      img: 'category/:id/img',
    };

    const result = paths(name);
    expect(result).toEqual(expected);
  });

  it('should generate correct paths with prefix', () => {
    const name = 'User';
    const prefix = 'api';
    const expected: RestApiPaths = {
      plural: 'api/users',
      singular: 'api/user',
      id: 'api/user/:id',
      increment: 'api/user/:id/increment',
      decrement: 'api/user/:id/decrement',
      count: 'api/users/count',
      relation: 'api/user/:id/:relationName',
      relationId: 'api/user/:id/:relationName/:relationId',
      file: 'api/user/:id/file',
      img: 'api/user/:id/img',
    };

    const result = paths(name, prefix);
    expect(result).toEqual(expected);
  });

  it('should handle different resource names', () => {
    const name = 'product';
    const expected: RestApiPaths = {
      plural: 'products',
      singular: 'product',
      id: 'product/:id',
      increment: 'product/:id/increment',
      decrement: 'product/:id/decrement',
      count: 'products/count',
      relation: 'product/:id/:relationName',
      relationId: 'product/:id/:relationName/:relationId',
      file: 'product/:id/file',
      img: 'product/:id/img',
    };

    const result = paths(name);
    expect(result).toEqual(expected);
  });

  it('should handle empty prefix', () => {
    const name = 'order';
    const prefix = '';
    const expected: RestApiPaths = {
      plural: 'orders',
      singular: 'order',
      id: 'order/:id',
      increment: 'order/:id/increment',
      decrement: 'order/:id/decrement',
      count: 'orders/count',
      relation: 'order/:id/:relationName',
      relationId: 'order/:id/:relationName/:relationId',
      file: 'order/:id/file',
      img: 'order/:id/img',
    };

    const result = paths(name, prefix);
    expect(result).toEqual(expected);
  });
});
